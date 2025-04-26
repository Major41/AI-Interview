"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter()
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
          toast.success('Account created sucesfully, Please sign in')
          router.push('/sign-in')
      } else {
        toast.success("Sign in sucesfull");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }
  const isSignin = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 py-14 px-10 card ">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="./logo.svg" alt="Logo" height={32} width={38} />
          <h2 className="text-primary-100">Robo-Interview</h2>
        </div>
        <h3>Practice job interview with Robo-Interview </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignin && (
              <FormInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name "
              />
            )}
            <FormInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email "
              type="email"
            />
            <FormInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your password "
              type="password"
            />

            <Button className="btn" type="submit">
              {" "}
              {isSignin ? "Sign In" : "Create an Account"}{" "}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {" "}
          {isSignin ? "No account yet?" : "Have an account already?"}{" "}
          <Link
            href={!isSignin ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {" "}
            {!isSignin ? "Sign in" : "Sign up"}{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
