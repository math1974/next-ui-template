import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Image, Input } from "antd";

import { useDispatch } from "react-redux";
import { login } from "../../processes/auth.process";
import { setToken } from "../../reducers/features/user.slice";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const redirectHome = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const isValidForm = useCallback((values) => {
    if (!values.email) {
      return false;
    }

    if (!values.password) {
      return false;
    }

    return true;
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      if (!isValidForm(values)) {
        return;
      }

      setLoading(true);

      const { payload } = await dispatch(login(values));

      setLoading(false);

      if (!payload) {
        toast.error("Dados inválidos.");
        return;
      }

      dispatch(setToken(payload));

      redirectHome();
    },
    [dispatch, isValidForm, redirectHome]
  );

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="flex h-screen bg-white items-center justify-center p-6">
      <div className="flex w-full overflow-hidden flex-col md:flex-row items-center">
        <div className="sm:w-1/2 flex bg-center h-100 items-center justify-center">
          <Image
            src="/images/logo-v2.webp"
            style={{ borderRadius: "30px" }}
            width={250}
            preview={false}
            className="sm:w-[180px]"
            alt="Golden Candies"
          />
        </div>
        <div className="max-w-[500px] w-full p-8 h-full flex flex-col">
          <div className="flex text-center flex-col mb-4">
            <h2 className="text-3xl font-bold text-center">
              Bem vindo ao portal <br /> Golden Candies
            </h2>

            <p className="text-gray-500 mt-4">
              Acesso exclusivo para colaboradores.
            </p>

            <p className="text-gray-500">
              Em caso de dúvidas entre em contato.
            </p>
          </div>

          <Form
            form={form}
            className="space-y-5"
            layout="vertical"
            onFinish={handleSubmit}
            disabled={loading}
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Preencha o e-mail.",
                },
              ]}
            >
              <Input size="large" type="email" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Preencha sua senha.",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              loading={loading}
            >
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
