from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    if user_input.startswith("السلام عليكم"):
        response = "وعليكم السلام"
    else:
        response = f"You said: {user_input}"
    return jsonify({'response': response})

def main():
    print("Server running!")

if __name__ == "__main__":
    main()
    app.run(debug=True)
