"use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useState } from "react";
// import { Loader2 } from "lucide-react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function SignInPage() {
  // const [isSubmiting, setIsSubmiting] = useState(false);
  // const router = useRouter();

  // const form = useForm<userLoginType>({
  //   resolver: zodResolver(userLoginSchema),
  //   defaultValues: {
  //     number: "",
  //     password: "",
  //   },
  // });

  // async function onSubmit(values: userLoginType) {
  //   try {
  //     setIsSubmiting(true);
  //     console.log(values);
  //     const response = await signIn("credentials", {
  //       redirect: false,
  //       number: values.number,
  //       password: values.password,
  //     });

  //     console.log(response);

  //     if (response) {
  //       router.replace("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmiting(false);
  //   }
  // }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* <div className="w-2/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Enter your phone number and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full flex flex-row justify-center items-center"
                  disabled={isSubmiting}
                >
                  {isSubmiting && <Loader2 className="animate-spin mr-2" />}
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="w-3/5 relative hidden md:flex md:flex-1 items-center justify-center bg-primary">
        <Image
          src="/signin.png"
          alt="Sign In Illustration"
          width={500}
          height={500}
          className="object-cover w-[100%] h-[100%] border border-black"
        />
      </div> */}
    </div>
  );
}
