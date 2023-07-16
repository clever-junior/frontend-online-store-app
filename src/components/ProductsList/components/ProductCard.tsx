import { Link } from "react-router-dom";
import IProduct from "../../../interfaces/IProduct";

interface ProductCardProps { product: IProduct }

const image = "flex-1 flex items-center justify-center max-md:h-auto max-md:w-full"

function ProductCard({ product }: ProductCardProps) {
  const {
    thumbnail, title, id, price, shipping: { free_shipping: freeShipping }
  } = product;

  return (
    <li className='flex flex-col items-center m-3 flex-1 rounded-lg bg-white shadow-md max-w-3xl  max-md:w-full' data-testid="product">
      <div className="">
        <Link to={`/product-detail/${id}`}>
          <div>
            <div className={image}>
              <img
                src={thumbnail}
                alt={title}
                width="284px"
                height="284px"
                className={`${image} object-cover`}
              />
            </div>
            <div className="flex-1 flex items-start flex-col flex-grow justify-start p-0 relative h-60">
              <div className="flex-grow p-5 flex flex-col relative w-full">
                <div className="w-60">
                  <h2 className="text-sm font-normal h-9 mb-5 max-h-9 text-ellipsis break-words font-sans block">
                    {title}
                  </h2>
                </div>
                <div className="mb-3">
                  <div className="text-2xl">
                    R$ {price}
                  </div>
                </div>
                <div className="mb-0">
                  {
                    freeShipping && (
                      <p className="text-sm font-semibold mr-5 text-emerald-600" data-testid="free-shipping"> Frete Grátis</p>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </li>
  )
}

export default ProductCard;