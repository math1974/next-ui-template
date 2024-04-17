"use client";

import React, { useCallback, useEffect, useState } from "react";
import ProtectedRoute from "../../hoc/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../processes/product.process";
import { getProductsListState, filtersChanged } from "../../reducers/features/productList.state";
import ProductListItem from "./ProductListItem";
import { Button, Input, Pagination } from "antd";
import {
  SearchOutlined,
  PlusCircleOutlined,
  Loading3QuartersOutlined,
} from "@ant-design/icons";
import useDebounce from "../../hooks/useDebounce";
import ModalProductForm from "./ModalProductForm";

function ProductList() {
  const dispatch = useDispatch();
  const [isCustomerModalOpened, setCustomerModalOpened] = useState(false);
  const { ids, loading, name, page, totalItems } =
    useSelector(getProductsListState);

  const getProducts = useCallback(() => {
    dispatch(fetchProducts({ name, page }));
  }, [dispatch, name, page]);

  useEffect(() => getProducts(), [name, page, getProducts]);

  const onChangePagination = useCallback(
    (page) => {
      dispatch(filtersChanged({ field: "page", value: page }));
    },
    [dispatch]
  );

  const onCloseFormModal = useCallback(resp => {
    setCustomerModalOpened(false);

    if (resp) {
      getProducts();
    }
  }, [getProducts]);

  const onSearchChange = useDebounce(
    useCallback(
      ({ target }) => {
        dispatch(
          filtersChanged({
            field: "name",
            value: target?.value,
            resetPagination: true
          })
        );
      },
      [dispatch]
    ),
    750
  );

  return (
    <>
      <div>
        <p className="text-2xl">Produtos</p>
        <p className="mt-2">Aqui você cadastra os seus produtos.</p>

        <div className="flex flex-col page-box">
          <div className="flex justify-between items-center">
            <div>
              <Input
                name="name"
                placeholder="Pesquise por nome"
                className="w-[300px]"
                onChange={onSearchChange}
                disabled={loading}
                prefix={<SearchOutlined />}
              />
            </div>

            <div>
              <Button
                type="primary"
                disabled={loading}
                onClick={() => setCustomerModalOpened(true)}
                className="flex items-center"
              >
                <PlusCircleOutlined className="inline-flex" />
                Adicionar
              </Button>
            </div>
          </div>

          {!loading ? (
            <div className="flex flex-col">
              <table className="min-w-full text-left text-sm mt-4">
                <thead className="border-b font-medium">
                  <tr>
                    <th scope="col" className="px-2 py-2" width="50%">
                      Nome
                    </th>

                    <th scope="col" className="px-2 py-2" width="20%">
                      Unidade de medida
                    </th>

                    <th scope="col" className="px-2 py-2" width="10%">
                      Preço
                    </th>

                    <th scope="col" className="px-2 py-2" width="10%">
                      Criado em
                    </th>

                    <th
                      scope="col"
                      align="center"
                      width="10%"
                      style={{ maxWidth: "150px" }}
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ids.length ? (
                    ids.map((id) => (
                      <ProductListItem
                        key={id}
                        productId={id}
                        loading={loading}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Nenhum produto encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {!loading && !!ids?.length && (
                <Pagination
                  className="mt-4"
                  showSizeChanger={false}
                  disabled={loading}
                  hideOnSinglePage
                  current={page}
                  defaultCurrent={1}
                  onChange={onChangePagination}
                  total={totalItems}
                />
              )}
            </div>
          ) : (
            <div hidden={!loading} className="flex justify-center h-[150px]">
              <Loading3QuartersOutlined spin className="text-3xl" />
            </div>
          )}
        </div>
      </div>

      {isCustomerModalOpened && <ModalProductForm onClose={onCloseFormModal} />}
    </>
  );
}

export default ProtectedRoute(ProductList);
