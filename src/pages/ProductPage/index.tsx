import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setCurrentProduct } from "../../store/catalogSlice";
import { ICatalogContext, ILaminatedChipboard, IProduct } from "../../types";
import { RootState } from "../../store";
import { ProductAPI } from "../../http";

import "./ProductPage.scss";
import { Loading } from "../../components/Loading";
import { ProductDTO } from "../../dto";

interface IAvailableColorsProps {
  catalogContext: Partial<ICatalogContext>;
  product: IProduct;
}

interface IProductPageProps {
  slug: string;
}

export const ProductPage = ({ slug }: { slug: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { laminatedChipboards, currentProduct: product } = useSelector(
    (state: RootState) => state.catalog
  );

  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchData() {
      try {
        const data: IProduct = await ProductAPI.findOne({ slug });
        dispatch(setCurrentProduct(data));

        if (data) {
          const productHistory: number[] =
            JSON.parse(localStorage.getItem("product_history")) || [];

          productHistory.push(data.id);

          localStorage.setItem(
            "product_history",
            JSON.stringify(Array.from(new Set(productHistory)))
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      setIsLoading(true);
      dispatch(setCurrentProduct(null));
    };
  }, [slug]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {product === null ? (
        <h1>не удалось получить данные</h1>
      ) : (
        <div className="product-page">
          <div className="product-page__gallery gallery">
            <div className="gallery__selected">
              <img
                className="gallery__selected-image"
                src="https://static.wikia.nocookie.net/7d5db291e-d700-4b6a-944b-eb0c84bf5781"
              />
            </div>
            <div className="gallery-carousel">
              <div className="gallery-carousel__item">
                <picture className="carousel-item__wrapper">
                  <img src="https://static.wikia.nocookie.net/7d5db291-d700-4b6a-944b-eb0c84bf5781" />
                </picture>
              </div>
            </div>
          </div>
          <div className="product-page__description description">
            <h1 className="description__title">{product.title}</h1>
            <span className="description__article">
              {"#" + product.um_product_article}
            </span>
            <span className="description__price">
              {product.um_product_price + " P"}
            </span>
            <section className="description__properties section">
              <h2 className="section__title">Основные характеристики</h2>
              <ul className="section__list">
                <li className="item__wrapper">
                  <div className="item__name">Размер (ШхВхГ)</div>
                  <div className="item__value">{`${product.um_product_width}х${product.um_product_height}х${product.um_product_depth} мм`}</div>
                </li>
                <li className="item__wrapper">
                  <div className="item__name">Материал</div>
                  <div className="item__value">
                    {product.um_product_material}
                  </div>
                </li>
                <li className="item__wrapper">
                  <div className="item__name">Цвет</div>
                  <div className="item__value">
                    {laminatedChipboards &&
                      laminatedChipboards.find(
                        (item) => item.id === product.um_laminated_chipboard_id
                      ).name}
                  </div>
                </li>
              </ul>
            </section>
            <AvailableColors
              product={product}
              laminatedChipboards={laminatedChipboards}
            />
            <section className="description__related section">
              <h2 className="section__title">Модели этой серии</h2>
              <div className="section__carousel">
                <li className="carousel-item">
                  <a className="carousel-item__wrapper">
                    <img width="64" height="64" src="/placeholder.webp" />
                    <div className="carousel-item__description">
                      <span className="carousel-item__title">
                        Комод 4 ящика 610х900х500
                      </span>
                      <span className="carousel-item__price">14 399</span>
                    </div>
                  </a>
                </li>
                <li className="carousel-item">
                  <a className="carousel-item__wrapper">
                    <img
                      width="64"
                      height="64"
                      src="https://static.wikia.nocookie.net/7d5db291-d700-4b6a-944b-eb0c84bf5781"
                    />
                    <div className="carousel-item__description">
                      <span className="carousel-item__title">
                        Комод 4 ящика 610х900х500
                      </span>
                      <span className="carousel-item__price">14 399</span>
                    </div>
                  </a>
                </li>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

function AvailableColors({
  product,
  laminatedChipboards,
}: {
  product: IProduct;
  laminatedChipboards: ILaminatedChipboard[];
}) {
  const [availableColors, setAvailableColors] = useState<IProduct[]>(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const productArticleQuery: string = product.um_product_article.slice(
          0,
          4
        );

        const data: IProduct[] = await ProductAPI.findAll({
          um_product_article: productArticleQuery,
        });

        // текущий продукт в начало коллекции
        const productIndex = data.findIndex((item) => item.id === product.id);
        [data[0], data[productIndex]] = [data[productIndex], data[0]];

        setAvailableColors(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [product]);

  return (
    <section className="description__colors section">
      <h2 className="section__title">Доступные цвета</h2>
      <ul className="section__carousel">
        {availableColors === null && (
          <li>
            <a className="carousel-item__wrapper">
              <img width={88} height={88} src={"/placeholder.webp"} />
            </a>
            <span className="carousel-item__title">Загрузка</span>
          </li>
        )}
        {availableColors?.length === 0 && <h2>Других цветов нет</h2>}
        {availableColors?.length &&
          availableColors.map((item) => (
            <li
              key={item.id}
              className={`carousel-item${
                product.id === item.id ? " carousel-item_selected" : ""
              }`}>
              <Link className="carousel-item__wrapper" to={`${item.link_slug}`}>
                <img
                  src={
                    item.um_product_preview_image ||
                    laminatedChipboards.find(
                      (ldsp) => ldsp.id === item.um_laminated_chipboard_id
                    ).um_ldsp_texture
                  }
                />
              </Link>
              <span className="carousel-item__title">
                {
                  laminatedChipboards.find(
                    (ldsp) => ldsp.id === item.um_laminated_chipboard_id
                  ).name
                }
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
}
