import BrandPanel from "./BrandPanel"
import ResetPasswordForm from "./ResetPasswordForm"

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen">
      <BrandPanel
        heading={[
          { text: "Secure access " },
          { text: "always", highlight: true },
        ]}
        subtext="Your admin account is protected with enterprise-grade security. Reset your password quickly and safely."
        stats={[
          { value: "2FA", label: "ENABLED" },
          { value: "256-bit", label: "ENCRYPTION" },
        ]}
      />
      <ResetPasswordForm />
    </div>
  )
}
