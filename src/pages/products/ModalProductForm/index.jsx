import React, { useEffect, useCallback, useMemo } from "react";
import { Form, Input, Flex, Select, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ModalComponent from "../../../components/Modal";
import LoadingComponent from "../../../components/Loading";

import * as ProductProcess from "../../../processes/product.process";

import { getProductFormState, resetForm } from "../../../reducers/features/modalProductForm.state";

import { toast } from "react-toastify";

const ModalproductForm = ({ id, onClose }) => {
  const dispatch = useDispatch();

  const { product, loading } = useSelector(getProductFormState);

  const initialValues = useMemo(
    () => ({
      name: product?.name,
      unity: product?.unity,
      price: +product?.price,
    }),
    [product]
  );

  const [productForm] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(ProductProcess.getProduct(id));
    }
  }, [dispatch, id]);

  const isValidForm = useCallback((product) => {
    if (!product.name) {
      toast.error("Informe o número do produto.");
      return false;
    }

    if (!product.unity) {
      toast.error("Informe a unidade do produto.");
      return false;
    }

    if (!product.price || product.price < 0) {
      toast.error("Informe um número maior que zero.");
      return false;
    }

    return true;
  }, []);

  const onFinish = useCallback(
    async (values) => {
      if (!isValidForm(values)) {
        return;
      }

      const saveAction = id ? "updateProduct" : "createProduct";

      const { payload } = await dispatch(
        ProductProcess[saveAction]({ ...values, id })
      );

      if (!payload) {
        toast.error(
          "Algo de errado aconteceu ao salvar as alterações, tente novamente mais tarde."
        );
        return;
      }

      productForm.resetFields();

      toast.success(`Produto ${id ? "editado" : "criado"} com sucesso!`);

      onClose(true);
    },
    [id, dispatch, onClose, isValidForm, productForm]
  );

  const modalOptions = {
    okText: id ? "Salvar as alterações" : "Salvar",
    cancelText: "Cancelar",
    onOk: () => {
      onFinish(productForm.getFieldsValue());
    },
    okCancel: false,
    onClose,
    onCancel: () => {
      dispatch(resetForm());

      onClose();
    },
    open: true,
  };

  return (
    <ModalComponent
      title={`${id ? "Editar" : "Criar"} produto`}
      {...modalOptions}
    >
      {loading ? (
        <LoadingComponent />
      ) : (
        <Form
          preserve={false}
          name="customer"
          form={productForm}
          initialValues={initialValues}
          onFinish={onFinish}
          disabled={loading}
          layout="vertical"
        >
          <Form.Item label="Nome" name="name" required>
            <Input maxLength={255} />
          </Form.Item>

          <Flex gap={16}>
            <Form.Item
              label="Preço de venda"
              name="price"
              className="w-full"
              required
            >
              <InputNumber
                prefix="R$"
                className="w-full"
                controls={false}
              />
            </Form.Item>

            <Form.Item
              label="Unidade de medida"
              name="unity"
              className="w-full"
              required
            >
              <Select>
                <Select.Option value="">Selecione</Select.Option>
                <Select.Option value="UN">Unidade</Select.Option>
                <Select.Option value="KG">Kg</Select.Option>
                <Select.Option value="PÇ">Peças</Select.Option>
              </Select>
            </Form.Item>
          </Flex>
        </Form>
      )}
    </ModalComponent>
  );
};

export default ModalproductForm;
