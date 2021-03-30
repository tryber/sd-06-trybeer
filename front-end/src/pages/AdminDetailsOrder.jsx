import React, { useContext } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import BeerContext from '../context/BeerContext';
import ProductCardAdmin from '../components/ProductCardAdmin';
import { getSalesProductsBySaleId } from '../api/index';

function AdminDetailsOrder() {
  const { saleDetail, setSaleDetail } = useContext(BeerContext);
  const { sale, products } = saleDetail;

  const handleClick = () => {
    async function getSaleDetail() {
      await getSalesProductsBySaleId(setSaleDetail, sale.saleId);
    }
    getSaleDetail();
  };

  return (
    <div className="admin-container">
      <AdminSideBar />
      <div className="admin-container-detail">
        <div>
          <h1>Admin Detail</h1>
        </div>
        { !saleDetail ? <p>Loading</p> : (
          <div>
            <div>
              <spam data-testid="order-number">{`Pedido ${sale.saleId}`}</spam>
              <spam data-testid="order-status">{` - ${sale.saleStatus}`}</spam>
            </div>
            <section className="orders-list">
              { products && products
                .map((prod, index) => (<ProductCardAdmin
                  key={ index }
                  product={ prod }
                  index={ index }
                />
                ))}
            </section>
            <p
              data-testid="order-total-value"
            >
              {`Total: R$ ${sale.saleTotal.replace('.', ',')}`}
            </p>
            { sale.saleStatus === 'Pendente' && (
              <button
                type="button"
                onClick={ async () => handleClick() }
                data-testid="mark-as-delivered-btn"
                // className="button"
              >
                Marcar como entregue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDetailsOrder;
