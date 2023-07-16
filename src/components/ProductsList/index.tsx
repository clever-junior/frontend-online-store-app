import IProduct from "../../interfaces/IProduct";
import ProductCard from "./components/ProductCard";

interface ProductListProps {
  chunk: IProduct[];
}

const ProductsList = ({ chunk }: ProductListProps) => {
  return (
    <ol className="flex list-none p-0 mb-4 max-md:flex-wrap">
      {
        chunk && chunk.slice(0, 4).map((product) => (
          <ProductCard product={product} key={`li-${product.id}`} />
        ))
      }
    </ol>
  )
}

export default ProductsList;