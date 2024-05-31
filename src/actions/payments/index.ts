"use server";

import { client } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const onGetDomainProductsAndConnectedAccountId = async (id: string) => {
  try {
    const connectedAccount = await client.domain.findUnique({
      where: {
        id: id,
      },
      select: {
        User: {
          select: {
            stripeId: true,
          },
        },
      },
    });

    const products = await client.product.findMany({
      where: {
        domainId: id,
      },
      select: {
        price: true,
        name: true,
        image: true,
      },
    });

    if (products) {
      const totalAmount = products.reduce((current, next) => {
        return current + next.price;
      }, 0);

      return {
        products: products,
        amount: totalAmount,
        stripeId: connectedAccount?.User?.stripeId,
      };
    }
  } catch (error) {
    console.log("[ON_GET_DOMAIN_PRODUCTS_AND_CONNECTED_ACCOUNT_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
