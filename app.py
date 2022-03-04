from flask import Flask, render_template, request, send_file, Response, session
from werkzeug.utils import secure_filename
import os
import subprocess
import cv2
import datetime
import detect
import json

app = Flask(__name__)
app.secret_key = "super secret key"
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.run(debug=True)
uploads_dir = os.path.join(app.instance_path, 'uploads')

os.makedirs(uploads_dir, exist_ok=True)

camera = cv2.VideoCapture(0)

filename = ""


def generate_frames():
    while True:
        # read the camera frame
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video')
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/login")
def login():
    return render_template('login.html')


@app.route("/forgot-password")
def forgot():
    return render_template('forgot-password.html')

# background process happening without any refreshing

@app.route('/capture')
def background_process_test():
    while camera.isOpened():
        success, image = camera.read()
        if success:
            now = datetime.datetime.now()
            cv2.imwrite(os.path.join('data/images/capture', '%dh%dm%ds_%d_%d_%d.png') %
                        (now.hour, now.minute, now.second, now.day, now.month, now.year), image)
            #subprocess.run("ls", shell=True)
            # subprocess.run(['python', 'detect.py','--weights'
            # ,'runs/train/exp/weights/best.pt','--data','data/data.yaml', '--name', 'capture'
            # ,'--source',  os.path.join('data/images/capture', '%dh%dm%ds_%d_%d_%d.png') %(now.hour, now.minute, now.second, now.day, now.month, now.year)], shell=True)
            detect.run(
                weights='runs/train/exp/weights/best.pt',
                data='data/data.yaml',
                source=os.path.join('data/images/capture', '%dh%dm%ds_%d_%d_%d.png') % (now.hour,now.minute, now.second, now.day, now.month, now.year),
                name = 'capture'                                                                       
            )
            savefig = 'static/'
            filefig = "capture.json"
            comfig = os.path.join(savefig, filefig)
            fl = open(comfig, "w")
            e = {
             "Bad": f'{detect.totalBad}',
             "Good": f'{detect.totalGood}',
             "Total": f'{detect.totalBad + detect.totalGood}'
            }
           # Serializing json 
            json_obj = json.dumps(e, indent = 4)
            fl.write(json_obj)
            fl.close()
            break
        else:
            break
    return ("nothing")

@app.route("/detect", methods=['POST'])
def e():
    if not request.method == "POST":
        return
    video = request.files['video']
    video.save(os.path.join(uploads_dir, secure_filename(video.filename)))
    print(video)
    #subprocess.run("ls", shell=True)
    #subprocess.run(['python', 'detect.py','--weights','runs/train/exp/weights/best.pt','--data','data/data.yaml', '--source',os.path.join(uploads_dir, secure_filename(video.filename)) ], shell=True)
    # return os.path.join(uploads_dir, secure_filename(video.filename))
    detect.run(
        weights='runs/train/exp/weights/best.pt',
        data='data/data.yaml',
        source=os.path.join(uploads_dir, secure_filename(video.filename))
    )
    save_path = 'static/'
    file_name = "product.json"
    completeName = os.path.join(save_path, file_name)
    f = open(completeName, "w")
    t = {
        "Bad": f'{detect.totalBad}',
        "Good": f'{detect.totalGood}',
        "Total": f'{detect.totalBad + detect.totalGood}'
    }
    # Serializing json 
    json_object = json.dumps(t, indent = 4)
    f.write(json_object)
    f.close()
    obj = secure_filename(video.filename)
    return obj

@app.route('/return-files', methods=['GET'])
def return_file():
    obj = request.args.get('obj')
    loc = os.path.join("runs/detect", obj)
    print(loc)
    try:
        return send_file(os.path.join("runs/detect", obj), attachment_filename=obj)
        # return send_from_directory(loc, obj)
    except Exception as e:
        return str(e)
