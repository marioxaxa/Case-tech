from ..static import PRODUCTS_DATA

from ..models import SKU

from ..db import db

def fill_db():

    for product in PRODUCTS_DATA["value"]:
        novo_produto = SKU(sku=product["SKU"],produto=product["produto"],preco_cheio=product["preco_cheio"],preco_descontado=product["preco_descontado"])
        print(novo_produto)
        db.session.add(novo_produto)

    db.session.commit()

    return PRODUCTS_DATA
