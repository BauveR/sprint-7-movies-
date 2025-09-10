import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "@/hooks/useForm";

type Form = {
  email: string;
  bio: string;
};

const initial: Form = { email: "", bio: "" };

describe("useForm", () => {
  test("inicializa con el estado dado y expone helpers", () => {
    const { result } = renderHook(() => useForm<Form>(initial));

    expect(result.current.formState).toEqual(initial);
    expect(result.current.email).toBe("");
    expect(result.current.bio).toBe("");
    expect(typeof result.current.onInputChange).toBe("function");
    expect(typeof result.current.onFieldChange).toBe("function");
    expect(typeof result.current.resetForm).toBe("function");
    expect(typeof result.current.setFormState).toBe("function");
  });

  test("onFieldChange actualiza un campo tipado por clave", () => {
    const { result } = renderHook(() => useForm<Form>(initial));

    act(() => {
      result.current.onFieldChange("email", "paul@atreides.com");
    });

    expect(result.current.formState.email).toBe("paul@atreides.com");
    expect(result.current.email).toBe("paul@atreides.com");
    expect(result.current.bio).toBe(""); // el resto permanece igual
  });

  test("onInputChange adapta un evento de <input>", () => {
    const { result } = renderHook(() => useForm<Form>(initial));

    act(() => {
      result.current.onInputChange({
        target: { name: "bio", value: "Fear is the mind-killer." },
      } as any); // simplificación del tipo ChangeEvent
    });

    expect(result.current.bio).toBe("Fear is the mind-killer.");
    expect(result.current.formState).toEqual({
      email: "",
      bio: "Fear is the mind-killer.",
    });
  });

  test("resetForm vuelve al estado inicial", () => {
    const { result } = renderHook(() => useForm<Form>(initial));

    act(() => {
      result.current.onFieldChange("email", "a@b.c");
      result.current.onFieldChange("bio", "hello");
    });
    expect(result.current.email).toBe("a@b.c");
    expect(result.current.bio).toBe("hello");

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formState).toEqual(initial);
    expect(result.current.email).toBe("");
    expect(result.current.bio).toBe("");
  });

  test("setFormState permite reemplazar el estado completo", () => {
    const { result } = renderHook(() => useForm<Form>(initial));

    act(() => {
      result.current.setFormState({ email: "x@y.z", bio: "ok" });
    });

    expect(result.current.formState).toEqual({ email: "x@y.z", bio: "ok" });
    expect(result.current.email).toBe("x@y.z");
    expect(result.current.bio).toBe("ok");
  });

  test("onFieldChange mantiene inmutabilidad (no muta el objeto previo)", () => {
    const { result } = renderHook(() => useForm<Form>(initial));
    const prev = result.current.formState;

    act(() => {
      result.current.onFieldChange("email", "immut@ble.dev");
    });

    expect(result.current.formState).not.toBe(prev);
    expect(prev.email).toBe(""); 
  });
});
