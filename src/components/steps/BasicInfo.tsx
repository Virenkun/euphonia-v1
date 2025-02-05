import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import {
  uploadProfilePicture,
  deleteProfilePicture,
} from "@/services/uploader/action";
import { FormikProps } from "formik";
import { OnboardingFormValues } from "@/app/(onboarding)/onboarding-form/page";

export function BasicInfo({
  formik,
  setAvatarUrl,
}: {
  formik: FormikProps<OnboardingFormValues>;
  setAvatarUrl: (url: string | undefined) => void;
}) {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await uploadProfilePicture(file);
      if (result) {
        setAvatarUrl(result.signedUrl);
      } else {
        alert("Failed to upload profile picture.");
      }
    }
  };

  const handleRemoveImage = async () => {
    if (formik.values.avatar) {
      await deleteProfilePicture(formik.values.avatar);
      setAvatarUrl(undefined);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32 border-4 border-white/50">
            <AvatarImage src={formik.values.avatar} />
            <AvatarFallback className="bg-indigo-200 text-indigo-700">
              <User className="w-16 h-16" />
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="picture-upload"
            />
            <label
              htmlFor="picture-upload"
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white text-indigo-700 hover:bg-white/90 h-10 px-4 py-2"
            >
              Upload Picture
            </label>
            {formik.values.avatar && (
              <button
                onClick={handleRemoveImage}
                className="text-white/80 hover:text-white underline"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="name">
              {`What's your name?`}
              <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              {...formik.getFieldProps("name")}
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
              placeholder="Enter your name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80" htmlFor="age">
              Can I know your age?
            </label>
            <Input
              id="age"
              {...formik.getFieldProps("age")}
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
              placeholder="Enter your age"
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-xs text-red-300">{formik.errors.age}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-white/80"
              htmlFor="gender"
            >
              Gender (optional)
            </label>
            <Select
              name="gender"
              onValueChange={(value) => formik.setFieldValue("gender", value)}
            >
              <SelectTrigger
                className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-gray-400 px-4 focus-visible:ring-1 focus-visible:ring-white focus:ring-white focus-visible:border-transparent focus-visible:outline-none`}
              >
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent className="bg-black/40 text-white backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-white/80"
              htmlFor="pronouns"
            >
              What pronouns do you use?
            </label>
            <Input
              id="pronouns"
              {...formik.getFieldProps("pronouns")}
              className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-white/60 px-4 focus-visible:ring-1 focus-visible:ring-white focus-visible:border-transparent focus-visible:outline-none`}
              placeholder="e.g., she/her, he/him, they/them"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
