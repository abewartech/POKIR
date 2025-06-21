export default function Card({
  shadowSize = "lg",
  children,
  className = "",
  title = "",
  ...rest
}) {
  return (
    <div
      className={`rounded-[18px] shadow-${shadowSize} w-full p-6 mb-8 bg-[#FFFFFF] ${className}`}
      {...rest}
    >
      {title && (
        <div className="mb-[24px] text-[#3C3C3C] text-[20px] font-bold">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}
