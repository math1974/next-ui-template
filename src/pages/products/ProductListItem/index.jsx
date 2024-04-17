import Swal from "sweetalert2";
import { Button, Tooltip } from "antd";
import { toast } from "react-toastify";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { getProductById } from "../../../reducers/entities/products";
import { removeProduct } from "../../../processes/product.process";

import ModalProductForm from "../ModalProductForm";

import FormatterUtils from "../../../utils/FormatterUtils";
import ProductUtils from "../../../utils/ProductUtils";

const ProductListItem = ({ productId }) => {
  const dispatch = useDispatch();

  const [editModalOpened, setEditModalOpened] = useState(false);

  const product = useSelector((state) => getProductById(state, productId));

  const onCloseFormModal = useCallback(() => {
    setEditModalOpened(false);
  }, []);

  const requestRemoveProduct = useCallback(async () => {
    const { payload } = await dispatch(removeProduct(product?.id));

    if (!payload) {
      toast.error(
        "Algo de errado aconteceu ao remover o produto, tente novamente mais tarde."
      );

      return;
    }

    toast.success(`Produto removido com sucesso!`);
  }, [product?.id, dispatch]);

  const onRemoveProduct = useCallback(() => {
    Swal.fire({
      title: "Tem certeza de que deseja remover o produto?",
      showCancelButton: true,
      icon: "warning",
      iconColor: "#FF7700",
      confirmButtonColor: "#FF7700",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Remover",
    }).then((result) => {
      if (result.isConfirmed) {
        requestRemoveProduct();
      }
    });
  }, [requestRemoveProduct]);

  return (
    <>
      <tr className="border-b hover:bg-neutral-100 border-neutral-200">
        <td className="whitespace-nowrap flex items-center px-2 py-3">
          <p className="max-w-[200px] truncate" title={product?.name}>
            {product?.name}
          </p>
        </td>

        <td className="whitespace-nowrap px-2 py-3">
          {ProductUtils.parseUnit(product?.unity)}
        </td>

        <td className="whitespace-nowrap px-2 py-3">
          {FormatterUtils.formatMoney(product?.price)}
        </td>

        <td className="whitespace-nowrap px-2 py-3">
          {FormatterUtils.formatDate(product?.created_at, "DD/MM/YYYY")}
        </td>

        <td className="whitespace-nowrap text-center">
          <Tooltip title="Editar">
            <Button
              size="medium"
              type="secondary"
              onClick={() => setEditModalOpened(true)}
              icon={<EditOutlined style={{ fontSize: "20px" }} />}
            ></Button>
          </Tooltip>

          <Tooltip title="Remover" color="red">
            <Button
              size="medium"
              type="secondary"
              onClick={onRemoveProduct}
              icon={
                <DeleteOutlined style={{ fontSize: "20px", color: "red" }} />
              }
            ></Button>
          </Tooltip>
        </td>
      </tr>

      {editModalOpened && (
        <ModalProductForm id={product?.id} onClose={onCloseFormModal} />
      )}
    </>
  );
};

export default ProductListItem;
