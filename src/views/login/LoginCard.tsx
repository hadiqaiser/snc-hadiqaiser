import { FormEvent, useCallback } from "react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Utils
import { createClient } from "@/utils/supabase/component";

// UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginCard = () => {
  // Vars
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Failed to login!");
      } else {
        toast.success("Successfully logged in!");
        router.push("/");
      }
    },
    [router, supabase.auth],
  );

  return (
    <Card className={classNames("w-80")}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Please enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className={classNames("grid w-full items-center gap-4")}>
            <div className={classNames("flex flex-col space-y-1.5")}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="janedoe@example.com"
                type="email"
                required
              />
            </div>
            <div className={classNames("flex flex-col space-y-1.5")}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="password"
                type="password"
                required
              />
            </div>
          </div>
          <div className={classNames("flex justify-end pt-6")}>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
