import React, { useContext, useEffect, useState } from "react";
import "./ProductCard.scss";
import { ILaminatedChipboard, IProduct } from "../../types";
import { useCatalog } from "../../context";
import { Link } from "react-router-dom";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: IProductCardProps) => {
  const { laminatedChipboards } = useCatalog();

  return (
    <div className="product-card__wrapper">
      <div className="product-card__gallery">
        <img
          width={256}
          height={256}
          className="product-card__gallery-preview"
          src={product.um_product_preview_image || "/placeholder.webp"}
        />
      </div>
      <div className="product-card__content">
        <section className="product-card__color-options"></section>
        <span className="product-card__price">{product.um_product_price}</span>
        <Link to={`${product.link_slug}`}>{product.title}</Link>
        <section className="product-card__properties">
          <ul className="properties__wrapper">
            <li className="properties-item">
              <span className="properties-item__name">Размер (ШхВхГ)</span>
              <span className="properties-item__value">{`${product.um_product_width}x${product.um_product_height}x${product.um_product_depth}`}</span>
            </li>
            <li className="properties-item">
              <span className="properties-item__name">Материал</span>
              <span className="properties-item__value">ЛДСП</span>
            </li>
            <li className="properties-item">
              <span className="properties-item__name">Цвет</span>
              <span className="properties-item__value">
                {laminatedChipboards &&
                  laminatedChipboards.find(
                    (item: ILaminatedChipboard) =>
                      item.id === product.um_laminated_chipboard_id
                  ).name}
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
