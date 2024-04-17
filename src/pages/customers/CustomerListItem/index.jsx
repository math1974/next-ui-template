import React, { useCallback, useMemo, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Button, Tooltip } from "antd";
import { getCustomerById } from "../../../reducers/entities/customers";
import { useDispatch, useSelector } from "react-redux";
import FormatterUtils from "../../../utils/FormatterUtils";
import ModalCustomerForm from "../ModalCustomerForm";
import Swal from "sweetalert2";
import { removeCustomer } from "../../../processes/customer.process";
import { toast } from "react-toastify";

const CustomerListTableItem = ({ customerId, loading }) => {
  const dispatch = useDispatch();
  const [editModalOpened, setEditModalOpened] = useState(false);

  const customer = useSelector((state) => getCustomerById(state, customerId));

  const customerCpfCnpjFormatted = useMemo(() => {
    if (customer?.cpf) {
      return FormatterUtils.formatCpf(customer.cpf);
    }

    if (customer?.cnpj) {
      return FormatterUtils.formatCnpj(customer.cnpj);
    }

    return "";
  }, [customer?.cpf, customer?.cnpj]);

  const onCloseFormModal = useCallback(() => {
    setEditModalOpened(false);
  }, []);

  const requestRemoveCustomer = useCallback(async () => {
    const { payload } = await dispatch(removeCustomer(customer?.id));

    if (!payload) {
      toast.error(
        "Algo de errado aconteceu ao remover o cliente, tente novamente mais tarde."
      );

      return;
    }

    toast.success(`Cliente removido com sucesso!`);
  }, [customer?.id, dispatch]);

  const onRemoveCustomer = useCallback(() => {
    Swal.fire({
      title: "Tem certeza de que deseja remover o cliente?",
      showCancelButton: true,
      icon: "warning",
      iconColor: "#FF7700",
      confirmButtonColor: "#FF7700",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Remover",
    }).then((result) => {
      if (result.isConfirmed) {
        requestRemoveCustomer();
      }
    });
  }, [requestRemoveCustomer]);

  return (
    <>
      <tr className="border-b hover:bg-neutral-100 border-neutral-200">
        <td className="whitespace-nowrap flex items-center px-2 py-3">
          <p className="max-w-[200px] truncate" title={customer?.name}>
            {customer?.name}
          </p>

          {!customer?.is_pf && (
            <span
              className="rounded-[12px] px-2 ml-4 text-white"
              style={{
                background: "#e5f4ff",
                color: "#008cff",
                fontSize: "12px",
              }}
            >
              Empresa
            </span>
          )}
        </td>

        <td className="whitespace-nowrap px-2 py-3">
          {customerCpfCnpjFormatted}
        </td>

        <td className="whitespace-nowrap px-2 py-3">
          {FormatterUtils.formatDate(customer?.created_at, "DD/MM/YYYY")}
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
              onClick={onRemoveCustomer}
              icon={
                <DeleteOutlined style={{ fontSize: "20px", color: "red" }} />
              }
            ></Button>
          </Tooltip>
        </td>
      </tr>

      {editModalOpened && (
        <ModalCustomerForm id={customer?.id} onClose={onCloseFormModal} />
      )}
    </>
  );
};

export default CustomerListTableItem;
