from flask import Flask, render_template, request

app = Flask(
    __name__,
    static_url_path="",
    static_folder="web/static/",
    template_folder="web/templates/",
)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/form", methods=["POST"])
def get_data_in_form():
    data = request.form
    return index()

if __name__ == "__main__":
    app.run()
