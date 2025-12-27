import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertToSlug } from "@/lib/slug";
import { Controller, type Control } from "react-hook-form";

type BaseProps = {
  name: string;
  control: Control<any>;
  displayName?: string;
};

type InputProps = BaseProps & { type?: "input" } & React.ComponentProps<typeof Input>;
type TextareaProps = BaseProps & { type: "textarea" } & React.ComponentProps<typeof Textarea>;

export function FormController({ name, control, displayName, ...props }: InputProps | TextareaProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <FieldLabel htmlFor={field.name}>{displayName}</FieldLabel>

          {props.type === "textarea" ? (
            <Textarea {...props} {...field} id={field.name} aria-invalid={fieldState.invalid} ref={field.ref as React.Ref<HTMLTextAreaElement>} />
          ) : (
            <Input {...props} {...field} id={field.name} aria-invalid={fieldState.invalid} ref={field.ref as React.Ref<HTMLInputElement>} />
          )}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function InputWithSlug({ inputName, slugName, control, displayName, getFieldState, setValue }: { inputName: string; slugName: string; control: Control<any>; displayName: string; getFieldState: Function; setValue: Function }) {
  return (
    <div className="space-y-2">
      <Controller
        name={inputName}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <FieldLabel htmlFor={field.name}>{displayName}</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value);
                const slugState = getFieldState(slugName);
                if (!slugState.isDirty)
                  setValue(slugName, convertToSlug(value), {
                    shouldDirty: false,
                    shouldTouch: false,
                  });
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name={slugName}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <p className="text-xs text-muted-foreground">
              Slug: <input {...field} id={field.name} aria-invalid={fieldState.invalid} className="bg-muted px-1 py-0.5 rounded outline-none" />
            </p>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}
