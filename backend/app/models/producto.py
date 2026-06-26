from app import db
from datetime import datetime

class Producto(db.Model):
    __tablename__ = 'productos'

    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(50), unique=True, nullable=False)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    precio = db.Column(db.Float, nullable=False, default=0.0) 
    stock_actual = db.Column(db.Integer, nullable=False, default=0)
    stock_minimo = db.Column(db.Integer, nullable=False, default=0)
    creado_en = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Producto {self.nombre}>'