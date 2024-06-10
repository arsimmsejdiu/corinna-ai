"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: "2024-04-10",
});

export const getUserClients = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const clients = await client.customer.count({
        where: {
          Domain: {
            User: {
              clerkId: user.id,
            },
          },
        },
      });
      if (clients) {
        return clients;
      }
    }
  } catch (error) {
    console.log("[GET_USER_CLIENTS]", error);
  }
};

export const getUserBalance = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connectedStripe = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      });

      if (connectedStripe) {
        const transactions = await stripe.balance.retrieve({
          stripeAccount: connectedStripe.stripeId!,
        });

        if (transactions) {
          const sales = transactions.pending.reduce((total, next) => {
            return total + next.amount;
          }, 0);

          return sales / 100;
        }
      }
    }
  } catch (error) {
    console.log("[GET_USER_BALANCE]", error);
  }
};

export const getUserPlanInfo = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const plan = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          _count: {
            select: {
              domains: true,
            },
          },
          subscription: {
            select: {
              plan: true,
              credits: true,
            },
          },
        },
      });

      if (plan) {
        return {
          plan: plan.subscription?.plan,
          credits: plan.subscription?.credits,
          domains: plan._count.domains,
        };
      }
    }
  } catch (error) {
    console.log("[GET_USER_PLAN_INFO]", error);
  }
};

export const getUserTotalProductPrices = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const product = await client.product.findMany({
        where: {
          Domain: {
            User: {
              clerkId: user.id,
            },
          },
        },
        select: {
          price: true,
        },
      });

      if (product) {
        const total = product.reduce((total, next) => {
          return total + next.price;
        }, 0);

        return total;
      }
    }
  } catch (error) {
    console.log("[GET_USER_TOTAL_PRODUCT_PRICES]", error);
  }
};

export const getUserTransactions = async () => {
  try {
    const user = await currentUser();
    if (user) {
      const connectionStripe = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          stripeId: true,
        },
      });

      if (connectionStripe) {
        const transactions = await stripe.charges.list({
          stripeAccount: connectionStripe.stripeId!,
        });

        if (transactions) {
          return transactions;
        }
      }
    }
  } catch (error) {
    console.log("[GET_USER_TRANSACTIONS]", error);
  }
};
