from app import db
from datetime import datetime

class MovimientoStock(db.Model):
    __tablename__= 'movimiento_stock'

    id = db.Column(db.Integer, primary_key=True)

    producto_id = db.Column(db.Integer, db.ForeignKey('productos.id'), nullable=False)

    tipo = db.Column(db.String(20), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    motivo = db.Column(db.String(255), nullable=False)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)

    producto = db.relationship('Producto', backref=db.backref('movimientos', lazy=True))


    def __repr__(self):
        return f'<Movimiento {self.tipo} - Cantidad {self.cantidad}>'