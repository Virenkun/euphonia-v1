import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

export function TeamMember({
  name,
  role,
  description,
  imageUrl,
}: TeamMemberProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className="w-full h-64 object-cover"
        />
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2">{name}</CardTitle>
        <p className="font-semibold text-muted-foreground mb-4">{role}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
