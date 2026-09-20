import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";


import { useBrands } from "@/hooks/useBrands";
import { useProductForm } from "@/hooks/useProductForm";
import { useSaveProduct } from "@/hooks/useSaveProduct";

import { Feedback, PageHeader } from "./adminUi";
import ProductForm from "@/components/Admin/ProductEditor/ProductForm";
import ProductContent from "@/components/Admin/ProductEditor/ProductContent";
import { useProductDetail, useProductRecord } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategory";
import { useTags } from "@/hooks/useTags";

const ProductEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const detail = useProductDetail(slug);
  const categories = useCategories();
  const brands = useBrands();
  const tags = useTags();

  const { product, setProduct, reload } = useProductRecord(detail.data);
  const { form, set, errors, validate } = useProductForm({
    detailData: detail.data,
    tagsData: tags.data,
  });

  const save = useSaveProduct({
    product,
    onCreated: (created) => {
      setProduct(created);
      navigate(`/admin/products/${created.slug}/edit`, { replace: true });
    },
    onUpdated: reload,
  });

  const submitBaseProduct = (event) => {
    event.preventDefault();
    const validated = validate();
    if (!validated) return;
    save.mutate(validated);
  };

  if (detail.isLoading) return <Feedback loading />;
  if (detail.error) return <Feedback error={detail.error} />;

  return (
    <div>
      <PageHeader
        title={product ? `Edit: ${product.title}` : "Add product"}
        description="Save the base product, then add every associated product record."
        action={
          <Link
            to="/admin/products"
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Products
          </Link>
        }
      />

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <ProductForm
          form={form}
          set={set}
          errors={errors}
          categories={categories.data}
          brands={brands.data}
          tags={tags.data}
          product={product}
          save={save}
          onSubmit={submitBaseProduct}
        />

        {product && <ProductContent product={product} reload={reload} />}
      </div>
    </div>
  );
};

export default ProductEditor;