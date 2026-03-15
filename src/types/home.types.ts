import type React from "react";

export interface HomeProduct {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly rating: number;
  readonly badge?: "New" | "Bestseller";
  readonly image: string;
}

export interface HomeTestimonial {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly product: string;
  readonly message: string;
  readonly rating: number;
}

export interface HomeStat {
  readonly value: string;
  readonly label: string;
  readonly icon: React.ReactNode;
}

export interface HomeBenefit {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly iconBg: string;
  readonly iconColor: string;
}

export interface HomeNavLink {
  readonly href: string;
  readonly label: string;
}

export interface HomeContactItem {
  readonly icon: React.ReactNode;
  readonly text: string;
}

export interface HomeAvatar {
  readonly color: string;
  readonly label: string;
}
