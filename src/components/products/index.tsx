import React from "react";
import TabsMenu from "../tabs";
import { TabsContent } from "../ui/tabs";
import { DataTable } from "../table";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { getMonthName } from "@/lib/utils";
import { SideSheet } from "../sheet";
import { Plus } from "lucide-react";
import { CreateProductForm } from "./product-form";
import { ButtonTabMenu } from "./button-tab-menu";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  domain: string | null;
};

type Props = {
  products: Product[];
  id: string;
};

const Products = ({ products, id }: Props) => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Products</h2>
        <p className="font-light text-sm">
          Add products to your store and set them live to accept payments from
          customers.
        </p>
      </div>
      <TabsMenu
        className=""
        triggers={[
          {
            label: "All products",
          },
          { label: "Live" },
          { label: "Deactivated" },
        ]}
        button={<ButtonTabMenu id={id} />}
      >
        <TabsContent value="All products">
          <DataTable headers={["Featured Image", "Name", "Pricing", "Created"]}>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={`https://ucarecdn.com/${product.image}/`}
                    width={50}
                    height={50}
                    alt="image"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="text-right">
                  {product.createdAt.getDate()}{" "}
                  {getMonthName(product.createdAt.getMonth())}{" "}
                  {product.createdAt.getFullYear()}
                </TableCell>
              </TableRow>
            ))}
          </DataTable>
        </TabsContent>
      </TabsMenu>
    </div>
  );
};

export default Products;
