"use client";

import { usePortal } from "@/hooks/portal/use-portal";
import React, { useEffect } from "react";
import { PortalFormProps } from "@/constants/types";

const PortalForm = ({
  questions,
  type,
  customerId,
  domainid,
  bookings,
  products,
  email,
  amount,
  stripeId,
}: PortalFormProps) => {
  const {
    step,
    onNext,
    onPrev,
    register,
    errors,
    date,
    setDate,
    onBookAppointment,
    onSelectedTimeSlot,
    selectedSlot,
    loading,
  } = usePortal(customerId, domainid, email);

  useEffect(() => {
    if (questions.every((question) => question.answered)) {
      onNext();
    }
  }, []);
};

export default PortalForm;
