"use client";

import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/hooks/settings/use-settings";
import React from "react";
// import { DomainUpdate } from './domain-update'
// import CodeSnippet from './code-snippet'
import PremiumBadge from "@/icons/premium-badge";
// import EditChatbotIcon from './edit-chatbot-icon'
import dynamic from "next/dynamic";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
