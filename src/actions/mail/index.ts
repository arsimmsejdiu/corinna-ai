"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const onGetAllCustomers = async (id: string) => {
  try {
    const customers = await client.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        subscription: {
          select: {
            credits: true,
            plan: true,
          },
        },
        domains: {
          select: {
            customer: {
              select: {
                id: true,
                email: true,
                Domain: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (customers) {
      return customers;
    }
  } catch (error) {
    console.log("[ON_GET_ALL_CUSTOMERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onGetAllCampaigns = async (id: string) => {
  try {
    const campaigns = await client.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        campaign: {
          select: {
            name: true,
            id: true,
            customers: true,
            createdAt: true,
          },
        },
      },
    });

    if (campaigns) {
      return campaigns;
    }
  } catch (error) {
    console.log("[ON_GET_ALL_CAMPAIGNS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onCreateMarketingCampaign = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) return null;

    const campaign = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        campaign: {
          create: {
            name: name,
          },
        },
      },
    });

    if (campaign) {
      return { status: 200, message: "You campaign was created" };
    }
  } catch (error) {
    console.log("[ON_CREATE_MARKETING_CAMPAIGN]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onSaveEmailTemplate = async (
  template: string,
  campainId: string
) => {
  try {
    const newTemplate = await client.campaign.update({
      where: {
        id: campainId,
      },
      data: {
        template: template,
      },
    });

    if (newTemplate) {
      return { status: 200, message: "Email template created" };
    }
  } catch (error) {
    console.log("[ON_SAVE_EMAIL_TEMPLATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onAddCustomersToEmail = async (
  customers: string[],
  id: string
) => {
  try {
    const customerAdd = await client.campaign.update({
      where: {
        id: id,
      },
      data: {
        customers: customers,
      },
    });

    if (customerAdd) {
      return { status: 200, message: "Customer added to campaign" };
    }
  } catch (error) {
    console.log("[ON_ADD_CUSTOMER_TO_EMAIL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onBulkMailer = async (email: string[], campaignId: string) => {
  try {
    const user = await currentUser();
    if (!user) return null;

    //get the template for this campaign
    const template = await client.campaign.findUnique({
      where: {
        id: campaignId,
      },
      select: {
        name: true,
        template: true,
      },
    });

    if (template && template.template) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODE_MAILER_EMAIL,
          pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        to: email,
        subject: template.name,
        text: JSON.parse(template.template),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      const creditsUsed = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          subscription: {
            update: {
              credits: { decrement: email.length },
            },
          },
        },
      });
      if (creditsUsed) {
        return { status: 200, message: "Campaign emails sent" };
      }
    }
  } catch (error) {
    console.log("[ON_BULK_MAILER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onGetAllCustomerResponses = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) return null;
    const answers = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        domains: {
          select: {
            customer: {
              select: {
                questions: {
                  where: {
                    customerId: id,
                    answered: {
                      not: null,
                    },
                  },
                  select: {
                    question: true,
                    answered: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (answers) {
      return answers.domains;
    }
  } catch (error) {
    console.log("[ON_GET_ALL_CUSTOMER_RESPONSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const onGetEmailTemplate = async (id: string) => {
  try {
    const template = await client.campaign.findUnique({
      where: {
        id,
      },
      select: {
        template: true,
      },
    });

    if (template) {
      return template.template;
    }
  } catch (error) {
    console.log("[ON_GET_EMAIL_TEMPLATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
