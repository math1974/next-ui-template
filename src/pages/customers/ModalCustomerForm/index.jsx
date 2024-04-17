import React, { useEffect, useCallback, useMemo } from "react";
import { Form, Input, Flex, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as CustomerProcess from "../../../processes/customer.process";
import ModalComponent from "../../../components/Modal";
import { getCustomerFormState, resetForm } from "../../../reducers/features/modalCustomerForm.state";
import FormatterUtils from "../../../utils/FormatterUtils";
import LoadingComponent from "../../../components/Loading";
import TextArea from "antd/es/input/TextArea";
import ValidatorUtils from "../../../utils/ValidatorUtils";
import { toast } from "react-toastify";

const ModalCustomerForm = ({ id, onClose }) => {
  const dispatch = useDispatch();

  const { customer, loading } = useSelector(getCustomerFormState);

  const initialValues = useMemo(
    () => ({
      name: customer?.name,
      type: "CUSTOMER",
      customer_entity: id ? (customer?.is_pf ? "PF" : "PJ") : "PF",
      email: customer?.email,
      phone: FormatterUtils.formatPhone(customer?.phone),
      cpf: FormatterUtils.formatCpf(customer?.cpf),
      cnpj: FormatterUtils.formatCnpj(customer?.cnpj),
      address: customer?.address,
    }),
    [id, customer]
  );

  const [customerForm] = Form.useForm();

  const customerEntity = Form.useWatch("customer_entity", customerForm);

  useEffect(() => {
    if (id) {
      dispatch(CustomerProcess.getCustomer({ customerId: id }));
    }
  }, [dispatch, id]);

  const isValidForm = useCallback((customer) => {
    if (!customer.name) {
      toast.error("Nome é obrigatório.");
      return false;
    }

    if (customer.email && !ValidatorUtils.isValidEmail(customer.email)) {
      toast.error("Email inválido.");
      return false;
    }

    if (customer.cpf && !ValidatorUtils.isValidCpf(customer.cpf)) {
      toast.error("CPF inválido.");
      return false;
    }

    return true;
  }, []);

  const onFinish = useCallback(
    async (values) => {
      const customerInfo = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        phone: FormatterUtils.clearMask(values.phone),
        cnpj:
          values.customer_entity === "PJ"
            ? FormatterUtils.clearMask(values.cnpj)
            : null,
        cpf:
          values.customer_entity === "PF"
            ? FormatterUtils.clearMask(values.cpf)
            : null,
        is_pf: values.customer_entity === "PF",
      };

      if (!id) {
        customerInfo.type = "CUSTOMER";
      }

      if (!isValidForm(customerInfo)) {
        return;
      }

      const saveAction = id ? "updateCustomer" : "createCustomer";

      const { payload } = await dispatch(
        CustomerProcess[saveAction]({ ...customerInfo, id })
      );

      if (!payload) {
        toast.error(
          "Algo de errado aconteceu ao salvar as alterações, tente novamente mais tarde."
        );
        return;
      }

      customerForm.resetFields();

      toast.success(`Cliente ${id ? "editado" : "criado"} com sucesso!`);

      onClose(true);
    },
    [id, dispatch, onClose, isValidForm, customerForm]
  );

  const onValuesChanged = useCallback(
    (changedValues, allValues) => {
      if (changedValues.phone) {
        const phoneFormatted = FormatterUtils.formatPhone(changedValues.phone);

        customerForm.setFieldValue("phone", phoneFormatted);
      }

      if (changedValues.cpf) {
        const cpfFormatted = FormatterUtils.formatCpf(changedValues.cpf);

        customerForm.setFieldValue("cpf", cpfFormatted);
      }

      if (changedValues.cnpj) {
        const cnpjFormatted = FormatterUtils.formatCnpj(changedValues.cnpj);

        customerForm.setFieldValue("cnpj", cnpjFormatted);
      }
    },
    [customerForm]
  );

  const modalOptions = {
    okText: id ? "Salvar as alterações" : "Salvar",
    cancelText: "Cancelar",
    onOk: () => {
      onFinish(customerForm.getFieldsValue());
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
      title={`${id ? "Editar" : "Criar"} cliente`}
      {...modalOptions}
    >
      {loading ? (
        <LoadingComponent/>
      ) : (
        <Form
          preserve={false}
          name="customer"
          form={customerForm}
          initialValues={initialValues}
          onFinish={onFinish}
          disabled={loading}
          onValuesChange={onValuesChanged}
          layout="vertical"
        >
          <Form.Item name="customer_entity">
            <Radio.Group>
              <Radio value="PF">Pessoa Física</Radio>
              <Radio value="PJ">Pessoa Jurídica</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>

          <Flex gap={16}>
            <Form.Item
              label="Email"
              name="email"
              className="w-full"
              rules={[{ message: "Please input the email!" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Telefone"
              name="phone"
              rules={[{ message: "Please input the phone!" }]}
            >
              <Input type="tel" maxLength={15} />
            </Form.Item>
          </Flex>

          {customerEntity === "PF" ? (
            <Form.Item
              label="CPF"
              name="cpf"
              className="w-full"
              rules={[{ message: "Please input the cpf!" }]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              label="CNPJ"
              name="cnpj"
              className="w-full"
              rules={[{ message: "Please input the cnpj!" }]}
            >
              <Input type="text" maxLength={18} />
            </Form.Item>
          )}

          <Form.Item
            label="Endereço"
            name="address"
            className="w-full"
            rules={[{ message: "Please input the cnpj!" }]}
          >
            <TextArea maxLength={255} />
          </Form.Item>
        </Form>
      )}
    </ModalComponent>
  );
};

export default ModalCustomerForm;
