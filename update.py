import smtplib
from Crypto.Util.Padding import pad, unpad
from Crypto.Cipher import AES
import requests
from Crypto.Random import get_random_bytes
from Crypto.Cipher import Blowfish
from solcx import compile_standard, install_solc
from web3 import Web3
# import mysql.connector
from flask_cors import CORS
from flask import *
# import cv2
# import numpy as np
import os
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# IPFS server API endpoint
# Replace with the actual API URL of your IPFS server
ipfs_api_url = "http://127.0.0.1:5001/api/v0"

# def encrypt_file(input_file, output_file, key):
#     print(key,type(key))
#     cipher = Blowfish.new(key, Blowfish.MODE_ECB)
#     chunk_size = 64  # Blowfish block size
#     with open("static/upload/"+input_file, 'rb') as infile, open("static/encrypt/"+output_file, 'wb') as outfile:
#         while True:
#             chunk = infile.read(chunk_size)
#             if len(chunk) == 0:
#                 break
#             elif len(chunk) % 8 != 0:
#                 # Padding the last block if its size is not a multiple of 8 bytes
#                 chunk += b' ' * (8 - (len(chunk) % 8))
#             encrypted_chunk = cipher.encrypt(chunk)
#             outfile.write(encrypted_chunk)
#     return upload_file_to_ipfs(output_file)
# def decrypt_file(input_file, output_file, key):
#     print(input_file,output_file,key)
#     cipher = Blowfish.new(key, Blowfish.MODE_ECB)
#     chunk_size = 64  # Blowfish block size
#     with open("static/download/"+input_file, 'rb') as infile, open("static/decrypt/de"+output_file, 'wb') as outfile:
#         while True:
#             chunk = infile.read(chunk_size)
#             if len(chunk) == 0:
#                 break
#             decrypted_chunk = cipher.decrypt(chunk)
#             outfile.write(decrypted_chunk)



UPLOAD_FOLDER = "static"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# ------------------ Enroll Face ------------------
@app.route("/enroll", methods=["POST"])
def enroll_face():
    name = request.form.get("name")
    user_id = request.form.get("id")
    file = request.files["image"]

    if not file:
        return jsonify({"status": "failure", "message": "No image received"})

    # Convert image to OpenCV format
    np_img = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)

    # Detect face and store image
    faces = face_cascade.detectMultiScale(img, 1.1, 5)
    
    if len(faces) == 0:
        return jsonify({"status": "failure", "message": "No face detected"})

    # Save multiple images for enrollment
    for i in range(5):
        x, y, w, h = faces[0]  # Use the first detected face
        cropped_face = img[y:y+h, x:x+w]  # Crop the detected face
        path = f"{UPLOAD_FOLDER}/{name}_{user_id}_{i}.jpg"
        cv2.imwrite(path, cropped_face)

    return jsonify({"status": "success", "message": "Face enrolled successfully"})

# ------------------ Authenticate Face ------------------
@app.route("/authenticate", methods=["POST"])
def authenticate_face_any_user():
    file = request.files.get("image")
    if not file:
        return jsonify({"status": "failure", "message": "No image receiv    ed"})

    # Convert to OpenCV grayscale
    np_img = np.frombuffer(file.read(), np.uint8)
    captured_image = cv2.imdecode(np_img, cv2.IMREAD_GRAYSCALE)

    # Detect face in captured image
    faces = face_cascade.detectMultiScale(captured_image, 1.1, 5)
    if len(faces) == 0:
        return jsonify({"status": "failure", "message": "No face detected"})

    x, y, w, h = faces[0]
    captured_face = captured_image[y:y+h, x:x+w]

    # Go through all registered users
    checked_users = set()
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.endswith(".jpg"):
            try:
                name, user_id, index = filename.split("_")
                index = index.split(".")[0]
                if (name, user_id) in checked_users:
                    continue  # Already checked this user

                # Load all 5 images for this user
                enrolled_faces = []
                for i in range(5):
                    path = f"{UPLOAD_FOLDER}/{name}_{user_id}_{i}.jpg"
                    if os.path.exists(path):
                        enrolled_faces.append(cv2.imread(path, cv2.IMREAD_GRAYSCALE))

                # Compare with all enrolled faces of this user
                for enrolled_face in enrolled_faces:
                    result = cv2.matchTemplate(captured_face, enrolled_face, cv2.TM_CCOEFF_NORMED)
                    if cv2.minMaxLoc(result)[1] > 0.5:  # Match threshold
                        mydb = connect()
                        mycursor = mydb.cursor()
                        tx = "select uid,role   from users where name='%s'" %(name)
                        mycursor.execute(tx)
                        e = mycursor.fetchone()
                        mydb.close()
                        
                        return jsonify({
                            "status": "success",
                            "message": f"Face recognized as {name}",
                            "name": name,
                            "id": e[0],
                            "role":e[1]
                        })
                    

                checked_users.add((name, user_id))
            except Exception as e:
                continue

    return jsonify({"status": "failure", "message": "wrong Face not recognized"})
def encrypt_file(input_file, output_file, key):
    cipher = AES.new(key, AES.MODE_ECB)
    chunk_size = 16  # AES block size is 16 bytes

    with open("static/upload/" + input_file, 'rb') as infile, open("static/encrypt/" + output_file, 'wb') as outfile:
        while True:
            chunk = infile.read(chunk_size)
            if len(chunk) == 0:
                break
            elif len(chunk) % 16 != 0:
                # Padding the last block if its size is not a multiple of 16 bytes
                chunk = pad(chunk, 16)
            encrypted_chunk = cipher.encrypt(chunk)
            outfile.write(encrypted_chunk)

    return upload_file_to_ipfs(output_file)


def decrypt_file(input_file, output_file, key):
    cipher = AES.new(key, AES.MODE_ECB)
    chunk_size = 16  # AES block size is 16 bytes

    with open("static/download/" + input_file, 'rb') as infile, open("static/decrypt/de" + output_file, 'wb') as outfile:
        while True:
            chunk = infile.read(chunk_size)
            if len(chunk) == 0:
                break
            decrypted_chunk = cipher.decrypt(chunk)
            outfile.write(decrypted_chunk)

    return "Decryption completed"


def upload_file_to_ipfs(file_path):
    try:
        # Send a POST request to add the file to IPFS
        response = requests.post(
            f"{ipfs_api_url}/add", files={"file": open("static/encrypt/"+file_path, "rb")})
        if response.status_code == 200:
            json_response = response.json()
            print(json_response)
            # The file has been successfully uploaded to IPFS
            ipfs_hash = json_response["Hash"]
            print(ipfs_hash)
            return ipfs_hash
        else:
            print(
                f"Failed to upload file to IPFS. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def download_file(f, fileid, key):
    print(f, fileid, key)
 # The URL of the file you want to download
    # Replace with the actual API URL of your IPFS server
    url = "http://127.0.0.1:8080/ipfs/%s?filename=%s" % (fileid, fileid)
    # The local file path where you want to save the downloaded file
    response = requests.get(url)
    if response.status_code == 200:
        with open("static/download/download"+f, "wb") as file:
            file.write(response.content)
        print(f"File downloaded and saved to {f}")
        decrypt_file("download"+f, "download"+f, key)


def soliditycontract(e, file_name):
    import json
    install_solc("0.6.0")
    with open("./SimpleStorage.sol", "r") as file:
        simple_storage_file = file.read()
    print(simple_storage_file)
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"SimpleStorage.sol": {"content": simple_storage_file}},
            "settings": {
                "outputSelection": {
                    "*": {
                        "*": ["abi", "metadata", "evm.bytecode", "evm.bytecode.sourceMap"]
                    }
                }
            },
        },
        solc_version="0.6.0",
    )
    with open("compiled_code.json", "w") as file:
        json.dump(compiled_sol, file)
    bytecode = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"][
        "bytecode"
    ]["object"]
    # get abi
    abi = json.loads(
        compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["metadata"]
    )["output"]["abi"]
    w3 = Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545'))
    chain_id = 1337
    print(w3.is_connected())
    my_address = e[0]
    private_key = e[1]
    # initialize contract
    SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)
    nonce = w3.eth.get_transaction_count(my_address)
    # set up transaction from constructor which executes when firstly
    transaction = SimpleStorage.constructor(file_name).build_transaction(
        {"chainId": chain_id, "from": my_address, "nonce": nonce}
    )
    signed_tx = w3.eth.account.sign_transaction(
        transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    tx_receipt = "".join(["{:02X}".format(b)
                         for b in tx_receipt["transactionHash"]])
    return tx_receipt


def connect():
    # return mysql.connector.connect(host="localhost", user="root",  password="",  database="forenics", auth_plugin='mysql_native_password', port="3306")
    import sqlite3
    return sqlite3.connect("forensic.db")


@app.route('/forenics/updatedata', methods=["POST"], strict_slashes=False)
def updatedata():
    r = request.json
    mydb = connect()
    d = "update data set filename ='%s',codeid ='%s',keyvalue ='%s',caseid ='%s' where did='%s'" % (
        r['filename'], r['codeid'], r['keyvalue'], r['caseid'], r['did'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'


@app.route('/forenics/viewdata', methods=["POST"], strict_slashes=False)
def viewdata():
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select did,filename,codeid,caseid from data"
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/deletedata', methods=["POST"], strict_slashes=False)
def deletedata():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "delete from data where did={0}".format(r['id'])
    mycursor.execute(tx)
    mycursor = mydb.cursor()
    tx = "delete from transactiondata where did={0}".format(r['id'])
    mycursor.execute(tx)
    mydb.commit()
    mydb.close()
    return 'e'


@app.route('/forenics/inserttransactiondata', methods=["POST"], strict_slashes=False)
def inserttransactiondata():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select td from transactiondata order by td desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
        eid = 1
    else:
        eid = e[0][0]+1
    d = "insert into transactiondata(td,trandata,uid,did,transcation,alltrans,trandate)values ('%s','%s','%s','%s','%s','%s','%s')" % (
        eid, r['trandata'], r['uid'], r['did'], r['transcation'], r['alltrans'], r['trandate'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 'e'


@app.route('/forenics/updatetransactiondata', methods=["POST"], strict_slashes=False)
def updatetransactiondata():
    r = request.json
    mydb = connect()
    d = "update transactiondata set trandata ='%s',uid ='%s',did ='%s',transcation ='%s',alltrans ='%s',trandate ='%s' where td='%s'" % (
        r['trandata'], r['uid'], r['did'], r['transcation'], r['alltrans'], r['trandate'], r['td'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'


@app.route('/forenics/viewtransactiondata', methods=["POST"], strict_slashes=False)
def viewtransactiondata():
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select *   from transactiondata"
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/viewtransactiondatasingle', methods=["POST"], strict_slashes=False)
def viewtransactiondatasingle():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select *   from transactiondata where did='%s'" % (r["did"])
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/deletetransactiondata', methods=["POST"], strict_slashes=False)
def deletetransactiondata():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "delete from transactiondata where td={0}".format(r['id'])
    mycursor.execute(tx)
    mydb.commit()
    mydb.close()
    return 's'


@app.route('/forenics/insertusers', methods=["POST"], strict_slashes=False)
def insertusers():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select uid from users order by uid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
        eid = 1
    else:
        eid = e[0][0]+1
    d = "insert into users(uid,name,email,password,addresss,keydata,role,aid)values ('%s','%s','%s','%s','%s','%s','%s','%s')" % (
        eid, r['name'], r['email'], r['password'], r['addresss'], r['keydata'], r["role"], r["areacode"])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    msg = "thank you registering for account"
    mail = smtplib.SMTP('smtp.gmail.com', 587)  # host and port area
    # Hostname to send for this command defaults to the FQDN of the local host.
    mail.ehlo()
    mail.starttls()  # security connection
    mail.login('classvebbox@gmail.com', 'wfvmiraatzkeqncw')  # login part
    mail.sendmail('classvebbox@gmail.com', r["email"], msg)  # send part
    print("Congrates! Your mail has send. ")
    return str(eid)


@app.route('/forenics/updateusers', methods=["POST"], strict_slashes=False)
def updateusers():
    r = request.json
    mydb = connect()
    d = "update users set name ='%s',email ='%s',password ='%s',addresss ='%s',keydata ='%s' where uid='%s'" % (
        r['name'], r['email'], r['password'], r['addresss'], r['keydata'], r['uid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'


@app.route('/forenics/viewusers', methods=["POST"], strict_slashes=False)
def viewusers():
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select *   from users"
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/deleteusers', methods=["POST"], strict_slashes=False)
def deleteusers():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "delete from users where uid={0}".format(r['id'])
    mycursor.execute(tx)
    mydb.commit()
    mydb.close()
    return 's'


@app.route('/forenics/upload', methods=['POST'])
def success():
    if request.method == 'POST':
        print(request.form)
        f = request.files['file']
        mydb = connect()
        mycursor = mydb.cursor()
        tx = 'SELECT filename FROM `data`'
        mycursor.execute(tx)
        e = mycursor.fetchall()
        x = [r[0] for r in e]
        if (f not in x):
            caseid = request.form["caseid"]
            key = get_random_bytes(16)
            address = request.form["address"]
            private = request.form["private"]

            uid = request.form["uid"]
            areacode = request.form['areacode']

            f.save("static/upload/"+f.filename)
            received = encrypt_file(f.filename, "en"+f.filename, key)
            ha = soliditycontract([address, private], received)
            # ha='s'
            mydb = connect()
            mycursor = mydb.cursor()
            tx = 'select did from data order by did desc limit 1'
            mycursor.execute(tx)
            e = mycursor.fetchall()
            if len(e) == 0:
                eid = 1
            else:
                eid = e[0][0]+1

            key = key.decode('latin-1')
            # print(key)
            # print(key)
            d = """insert into data(did,filename,codeid,keyvalue,caseid,aid)values ("%s","%s","%s","%s","%s","%s")""" % (
                eid, f.filename, received, key, caseid, areacode)
            mycursor = mydb.cursor()
            mycursor.execute(d)

            mycursor = mydb.cursor()
            tx = 'select td from transactiondata order by td desc limit 1'
            mycursor.execute(tx)
            e = mycursor.fetchall()
            if len(e) == 0:
                did = 1
            else:
                did = e[0][0]+1
            d = "insert into transactiondata(td,trandata,uid,did,alltrans)values ('%s','%s','%s','%s','%s')" % (
                did, ha, uid, eid, 'insert')
            mycursor = mydb.cursor()
            mycursor.execute(d)
            mydb.commit()
            mydb.close()
            return 'e'
        else:
            return "wrong"


@app.route('/forenics/login', methods=["POST"], strict_slashes=False)
def login():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select *   from users where uid='%s' and password='%s'" % (
        r["id"], r["password"])
    mycursor.execute(tx)
    e = mycursor.fetchone()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/downloadfile', methods=["POST"], strict_slashes=False)
def downloadfile():
    r = request.json
    val = r["data"]
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select keyvalue   from data where did='%s' " % (val[0])
    mycursor.execute(tx)
    e = mycursor.fetchone()
    encoded_bytes = e[0].encode('latin-1')
    print(encoded_bytes)
    mydb.close()
    download_file(val[1], val[2], encoded_bytes)
    return 'e'


@app.route('/forenics/casewise', methods=["POST"], strict_slashes=False)
def casewise():
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select distinct(caseid) from data"
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/casewisebyid', methods=["POST"], strict_slashes=False)
def casewisebyid():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select distinct(caseid) from data where aid in (select aid from users where uid='%s')" % (
        r["id"])
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/caserequestwise', methods=["POST"], strict_slashes=False)
def caserequestwise():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select * from requestaccess where userid='%s'" % (r["userid"])
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/caserequestapprove', methods=["POST"], strict_slashes=False)
def caserequestapprove():
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select * from requestaccess where approve=0"
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/bycase', methods=["POST"], strict_slashes=False)
def deletecase():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "delete from transactiondata where did in ( select did from data where caseid='{0}')".format(
        r['id'])

    mycursor.execute(tx)
    mycursor = mydb.cursor()
    tx = "delete from data where caseid='{0}'".format(r['id'])
    mycursor.execute(tx)

    mydb.commit()
    mydb.close()
    return 'e'


@app.route('/forenics/casewisesingle', methods=["POST"], strict_slashes=False)
def casewisesingle():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select did,filename,codeid,caseid from data where caseid='%s'" % (
        r["cid"])
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/requestforcase', methods=["POST"], strict_slashes=False)
def requestforcase():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select rid from requestaccess order by rid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
        did = 1
    else:
        did = e[0][0]+1
    d = "insert into requestaccess(rid,caseid,approve,userid)values ('%s','%s','%s','%s')" % (
        did, r['caseid'], 0, r["userid"])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    return 's'


@app.route('/forenics/approverequest', methods=["POST"], strict_slashes=False)
def approverequest():
    r = request.json
    mydb = connect()
    d = "update requestaccess set approve='%s' where rid='%s'" % (
        r["approve"], r["id"])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    return 's'


@app.route('/forenics/viewdatabyid', methods=["POST"], strict_slashes=False)
def viewdatabyid():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select did,filename,codeid,caseid from data where aid in (select aid from users where uid='%s')" % (
        r["id"])
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/endofall', methods=["POST"], strict_slashes=False)
def endofall():
    import os
    directory_path = "static/decrypt/"
    files = os.listdir(directory_path)
    for file in files:
        file_path = os.path.join(directory_path, file)
        if os.path.isfile(file_path):
            os.remove(file_path)
    directory_path = "static/download/"
    files = os.listdir(directory_path)
    for file in files:
        file_path = os.path.join(directory_path, file)
        if os.path.isfile(file_path):
            os.remove(file_path)
    directory_path = "static/encrypt/"
    files = os.listdir(directory_path)
    for file in files:
        file_path = os.path.join(directory_path, file)
        if os.path.isfile(file_path):
            os.remove(file_path)
    directory_path = "static/upload/"
    files = os.listdir(directory_path)
    for file in files:
        file_path = os.path.join(directory_path, file)
        if os.path.isfile(file_path):
            os.remove(file_path)
    print("All files deleted successfully.")
    return 's'


@app.route('/forenics/insertarea', methods=["POST"], strict_slashes=False)
def insertarea():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = 'select aid from area order by aid desc limit 1'
    mycursor.execute(tx)
    e = mycursor.fetchall()
    if len(e) == 0:
        eid = 1
    else:
        eid = e[0][0]+1
    d = "insert into area(aid,area,pincode)values ('%s','%s','%s')" % (
        eid, r['area'], r['pincode'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 'e'


@app.route('/forenics/updatearea', methods=["POST"], strict_slashes=False)
def updatearea():
    r = request.json
    mydb = connect()
    d = "update area set area ='%s',pincode ='%s' where aid='%s'" % (
        r['area'], r['pincode'], r['aid'])
    mycursor = mydb.cursor()
    mycursor.execute(d)
    mydb.commit()
    mydb.close()
    return 's'


@app.route('/forenics/viewarea', methods=["POST"], strict_slashes=False)
def viewarea():
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "select *   from area"
    mycursor.execute(tx)
    e = mycursor.fetchall()
    mydb.close()
    return json.dumps(e)


@app.route('/forenics/deletearea', methods=["POST"], strict_slashes=False)
def deletearea():
    r = request.json
    mydb = connect()
    mycursor = mydb.cursor()
    tx = "delete from area where aid={0}".format(r['id'])
    mycursor.execute(tx)
    mydb.commit()
    mydb.close()
    return 's'


if __name__ == '__main__':
    app.run(debug=True)
