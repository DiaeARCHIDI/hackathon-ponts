from flask import Flask, render_template, request, session
import os
from werkzeug.utils import secure_filename

from src.utils.ask_question_to_pdf import ask_question_to_pdf

app = Flask(__name__)

app.secret_key = "supersecretkey"
UPLOAD_FOLDER = "/Users/diaea/tp-hackathon/hackathon-ponts/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def hello_world(name=None):
    return render_template("index.html", name=name)


@app.route("/upload", methods=["POST"])
def upload_pdf():
    if "pdf" not in request.files:
        return "No file part", 400

    file = request.files["pdf"]

    if file.filename == "":
        return "No selected file", 400

    if file and file.filename.endswith(".pdf"):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)

        session["pdf_path"] = file_path

        return "File successfully uploaded", 200

    return "Invalid file format", 400


@app.route("/prompt", methods=["GET", "POST"])
def response():
    res = request.form.get("prompt")

    pdf_path = session.get("pdf_path")

    if pdf_path:
        answer = ask_question_to_pdf(res, pdf_path=pdf_path)
    else:
        return "No uploaded file available", 400

    return {"answer": answer}


@app.route("/question", methods=["GET"])
def ask_question():
    qst = "Pose-moi une question concernant le texte"
    pdf_path = session.get("pdf_path")

    if pdf_path:
        answer = ask_question_to_pdf(qst, pdf_path=pdf_path)
    else:
        return "No uploaded file available", 400

    return {"answer": answer}


@app.route("/answer", methods=["POST"])
def ans_question():
    answ = (
        request.form.get("prompt")
        + " "
        + "Vérifie si ma réponse est juste, sinon donne-moi la réponse correcte à cette question que tu viens de me poser"
        + " "
        + request.form.get("question")
    )

    pdf_path = session.get("pdf_path")

    if pdf_path:
        answer = ask_question_to_pdf(answ, pdf_path=pdf_path)
    else:
        return "No uploaded file available", 400

    return {"answer": answer}


a = ""


@app.route("/qcm", methods=["GET"])
def qcm():
    qst = "Donne une question à choix multiples concernant le texte"
    pdf_path = session.get("pdf_path")

    if pdf_path:
        answer = ask_question_to_pdf(qst, pdf_path=pdf_path)
    else:
        return "No uploaded file available", 400
    global a
    a = str(answer)
    return {"answer": answer}


@app.route("/A", methods=["GET"])
def A():
    global a
    qst = "Selon le texte, la réponse A est-elle la bonne réponse pour la question " + a
    pdf_path = session.get("pdf_path")

    if pdf_path:
        answer = ask_question_to_pdf(qst, pdf_path=pdf_path)
    else:
        return "No uploaded file available", 400
    return {"answer": answer}


@app.route("/B", methods=["GET"])
def B():
    global a
    qst = "Selon le texte, la réponse B est-elle la bonne réponse pour la question " + a
    pdf_path = session.get("pdf_path")

    if pdf_path:
        answer = ask_question_to_pdf(qst, pdf_path=pdf_path)
    else:
        return "No uploaded file available", 400
    return {"answer": answer}


@app.route("/C", methods=["GET"])
def C():
    global a
    qst = "Selon le texte, la réponse C est-elle la bonne réponse pour la question " + a
    pdf_path = session.get("pdf_path")

    if pdf_path:
        answer = ask_question_to_pdf(qst, pdf_path=pdf_path)
    else:
        return "No uploaded file available", 400
    return {"answer": answer}


@app.route("/D", methods=["GET"])
def D():
    global a
    qst = "Selon le texte, la réponse D est-elle la bonne réponse pour la question " + a
    pdf_path = session.get("pdf_path")

    if pdf_path:
        answer = ask_question_to_pdf(qst, pdf_path=pdf_path)
    else:
        return "No uploaded file available", 400
    return {"answer": answer}


if __name__ == "__main__":
    app.run(debug=True)
