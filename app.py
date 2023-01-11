from flask import Flask ,jsonify ,request # Y Metodos jsonify,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask import render_template

#Inicializacion

app=Flask(__name__)
CORS(app) #Para que me permita acceder al backend desde el frontend
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/ahoy'
#configuro la base de datos ¿local? con nombre,contraseña,¿ip? y nombre de la BBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db = SQLAlchemy(app)
marsh = Marshmallow(app)

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))
    os = db.Column(db.String(45)) #foreign
    category = db.Column(db.String(45)) #foreign
    img = db.Column(db.String(1000))
    uploader = db.Column(db.String(45)) #foreign
    date = db.Column(db.String(10))
    editdate = db.Column(db.String(10))
    views = db.Column(db.Integer)
    downloads = db.Column(db.Integer)
    seeders = db.Column(db.Integer)
    leechers = db.Column(db.Integer)

    def __init__(self,name,os,category,img,uploader,date,editdate,views,downloads,seeders,leechers):
        self.name = name
        self.os = os
        self.category = category
        self.img = img
        self.uploader = uploader
        self.date = date
        self.editdate = editdate
        self.views = views
        self.downloads = downloads
        self.seeders = seeders
        self.leechers = leechers

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))

    def __init__(self,name):
        self.name = name

class Opsystem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45))

    def __init__(self,name):
        self.name = name

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(45))
#     email = db.Column(db.String(60))
#     password = db.Column(db.String(45))
#     admin = db.Column(db.Integer)
#     birthday = db.Column(db.DateTime)
#     createdate = db.Column(db.DateTime)
#     uploads = db.Column(db.Integer)
#     comments = db.Column(db.Integer)
#     posts = db.Column(db.Integer)
#     avatar = db.Column(db.String(400))

#     def __init__(self,id,name,email,password,admin,birthday,createdate,uploads,comments,posts,avatar):
#         self.id = id
#         self.name = name
#         self.email = email
#         self.password = password
#         self.admin = admin
#         self.birthday = birthday
#         self.createdate = createdate
#         self.uploads = uploads
#         self.comments = comments
#         self.posts = posts
#         self.avatar = avatar

with app.app_context():
    db.create_all()

# PROGRAMS SCHEMA
class ProgramSchema(marsh.Schema):
    class Meta:
        # id,name,os,category,img,uploader,date,editdate,views,downloads,seeders,leechers
        fields = ('id','name','os','category','img','uploader','date','editdate','views','downloads','seeders','leechers')

program_schema = ProgramSchema()
programs_schema = ProgramSchema(many=True)

# OPERATING SYSTEMS SCHEMA
class SystemSchema(marsh.Schema):
    class Meta:
        fields = ('id','name')

system_schema = SystemSchema()
systems_schema = SystemSchema(many=True)

# CATEGORIES SCHEMA
class CategorySchema(marsh.Schema):
    class Meta:
        fields = ('id','name')

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)

@app.route('/showtable', methods=['GET'])
def get_programs():
    all_programs=Program.query.all()
    result=programs_schema.dump(all_programs)

    return jsonify(result)

@app.route('/upload', methods=['POST'])
def upload_program():
    print(request.json)
    name = request.json['name']
    os = request.json['system']
    category = request.json['category']
    img = request.json['img']
    uploader = request.json['uploader']
    date = request.json['date']
    editdate = request.json['edit']
    views = request.json['views']
    downloads = request.json['downloads']
    seeders = request.json['seeders']
    leechers = request.json['leechers']

    new_program = Program(name,os,category,img,uploader,date,editdate,views,downloads,seeders,leechers)
    db.session.add(new_program)
    db.session.commit()
    return program_schema.jsonify(new_program)

@app.route('/program/<id>', methods=['GET'])
def getProgram(id):
    program = Program.query.get(id)
    
    return program_schema.jsonify(program)

@app.route('/editprogram/<id>', methods=['PUT'])
def update_program(id):
    program=Program.query.get(id)

    # program.name=request.json['name']
    # program.os=request.json['system']
    # program.category=request.json['category']
    # program.img=request.json['img']
    # program.editdate=request.json['edit']

    name=request.json['name']
    os=request.json['system']
    category=request.json['category']
    img=request.json['img']
    editdate=request.json['edit']

    program.name=name
    program.os=os
    program.category=category
    program.img=img
    program.editdate=editdate

    db.session.commit()
    return program_schema.jsonify(program)

@app.route('/delete/<id>', methods=['DELETE'])
def delete_program(id):
    program = Program.query.get(id)
    db.session.delete(program)
    db.session.commit()
    
    return program_schema.jsonify(program)

@app.route('/getos')
def get_opsystems():
    all_systems = Opsystem.query.all()
    result = systems_schema.dump(all_systems)

    return jsonify(result)

@app.route('/getcat')
def get_categories():
    all_categories = Category.query.all()
    result = categories_schema.dump(all_categories)

    return jsonify(result)

###########################################################################

if __name__=='__main__':
    app.run(debug=True)