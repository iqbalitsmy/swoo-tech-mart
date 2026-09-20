import React, { useEffect, useMemo, useState } from "react";
import VariantSelector from "./VariantSelector";
import PromoCallout from "./PromoCallout";
import { Link } from "react-router-dom";


const formatPrice = (value) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(value);


export default function ProductInfo({ product, selectedVariant }) {
  const highlights = [...(product.highlights ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);

  // Shows the exact price of whatever BuyBox currently has selected, once
  // known; otherwise falls back to the product-level min/max range.
  const priceDisplay = selectedVariant
    ? formatPrice(selectedVariant.price)
    : product.minPrice === product.maxPrice
      ? formatPrice(product.minPrice)
      : `${formatPrice(product.minPrice)} – ${formatPrice(product.maxPrice)}`;

  return (
    <div className="flex w-full flex-col gap-4">

      <h1 className="text-xl font-bold leading-snug text-gray-900">
        {product.title}
      </h1>

      <p className="text-2xl font-bold text-gray-900">
        {priceDisplay}
      </p>

      {highlights?.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {highlights.map((point) => (
            <li key={point.id} className="flex gap-2 text-sm text-gray-600">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              {point.text}
            </li>
          ))}
        </ul>
      )}

      {product.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-primary-light/20 px-2 py-1 text-[11px] font-semibold text-primary-dark"
            >
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1 border-t border-gray-100 pt-4 text-sm">
        <p>
          <span className="font-bold text-gray-900">SKU:</span>{" "}
          <span className="text-gray-600">{selectedVariant?.sku ?? product.sku}</span>
        </p>
        <p>
          <span className="font-bold text-gray-900">CATEGORY:</span>{" "}
          <Link to={`/products?category=${product?.category?.slug}`} className="text-primary hover:underline">
            {product?.category.name}
          </Link>
        </p>
        <p>
          <span className="font-bold text-gray-900">BRAND:</span>{" "}
          <Link to={`/products?brand=${product?.brand?.slug}`} className="text-primary hover:underline">
            {product?.brand?.name || "No Brand"}
          </Link>
        </p>
      </div>
    </div>
  );
}