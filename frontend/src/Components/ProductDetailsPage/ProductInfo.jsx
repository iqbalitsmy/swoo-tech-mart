import React, { useState } from "react";
import VariantSelector from "./VariantSelector";
import PromoCallout from "./PromoCallout";


export default function ProductInfo({ product, onColorChange, onMemoryChange }) {
  const [selectedColor, setSelectedColor] = useState(product.defaultColor);
  const [selectedMemory, setSelectedMemory] = useState(product.defaultMemory);

  const colorOption = product.colorOptions.find((c) => c.value === selectedColor);
  const memoryOption = product.memoryOptions.find((m) => m.value === selectedMemory);

  const handleColorSelect = (value) => {
    setSelectedColor(value);
    onColorChange?.(value);
  };

  const handleMemorySelect = (value) => {
    setSelectedMemory(value);
    onMemoryChange?.(value);
  };

  return (
    <div className="flex w-full flex-col gap-4">

      <h1 className="text-xl font-bold leading-snug text-gray-900">
        {product.title}
      </h1>

      <p className="text-2xl font-bold text-gray-900">
        ${product.minPrice?.toFixed(2)} - ${product.maxPrice?.toFixed(2)}
      </p>

      {
        product.highlights?.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {product.highlights.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                {point}
              </li>
            ))}
          </ul>
        )
      }

      {
        product.tags?.length > 0 && (
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
        )
      }

      <div className="border-t border-gray-100 pt-4">
        <VariantSelector
          label="Color"
          selectedLabel={colorOption?.label}
          options={product.colorOptions}
          selectedValue={selectedColor}
          onSelect={handleColorSelect}
        />
      </div>

      <VariantSelector
        label="Memory Size"
        selectedLabel={memoryOption?.label}
        options={product.memoryOptions}
        selectedValue={selectedMemory}
        onSelect={handleMemorySelect}
      />

      <div className="flex flex-col gap-1 border-t border-gray-100 pt-4 text-sm">
        <p>
          <span className="font-bold text-gray-900">SKU:</span>{" "}
          <span className="text-gray-600">{product.sku}</span>
        </p>
        <p>
          <span className="font-bold text-gray-900">CATEGORY:</span>{" "}
          <span className="text-gray-600">{product.category}</span>
        </p>
        <p>
          <span className="font-bold text-gray-900">BRAND:</span>{" "}
          <a href="#" className="text-primary hover:underline">
            {product.brand}
          </a>
        </p>
      </div>
    </div>
  );
}