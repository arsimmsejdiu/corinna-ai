import { Plus } from "lucide-react";
import { SideSheet } from "../sheet";
import { CreateProductForm } from "./product-form";

type ButtonTabMenuProps = {
  id: string;
};

export const ButtonTabMenu = ({ id }: ButtonTabMenuProps) => {
  return (
    <div className="flex-1 flex justify-end">
      <SideSheet
        description="Add products to your store and set them live to accept payments from
          customers."
        title="Add a product"
        className="flex items-center gap-2 bg-orange px-4 py-2 text-black font-semibold rounded-lg text-sm"
        trigger={
          <>
            <Plus size={20} className="text-white" />
            <p className="text-white">Add Product</p>
          </>
        }
      >
        <CreateProductForm id={id} />
      </SideSheet>
    </div>
  );
};
