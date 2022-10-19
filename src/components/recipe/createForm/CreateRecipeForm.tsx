// Packages
import { Formik, Form, FieldArray, Field, FormikErrors } from "formik";
import { Fragment, useRef } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Components
import ErrMessage from "./ErrMessage";

// Utils
import { RecipeSchema } from "../../../types/schemas";
import { trpc } from "../../../utils/trpc";
import { uploadCloudinary } from "../../../utils/uploadCloudinary";

const recipeInit: {
  title: string;
  description: string;
  category: string;
  photos: File[];
  ingredients: { name: string; amount: string; unit: string }[];
  directions: { step: number; text: string }[];
} = {
  title: "",
  description: "",
  category: "",
  photos: [],
  ingredients: [
    {
      name: "",
      amount: "",
      unit: "United States",
    },
  ],
  directions: [
    {
      step: 1,
      text: "",
    },
  ],
};

export default function RecipeForm({ recipe }: { recipe?: any }) {
  const stepRef = useRef(1);
  const { data } = trpc.recipe.getSignature.useQuery();
  const recipeMutation = trpc.recipe.createRecipe.useMutation();

  return (
    <Formik
      initialValues={recipeInit}
      validationSchema={toFormikValidationSchema(RecipeSchema)}
      onSubmit={async (values, { resetForm }) => {
        if (data?.signature && data.timestamp) {
          const cloudinaryPhotos = await uploadCloudinary(
            values.photos,
            data.signature,
            data.timestamp
          );
          console.log("cloud", cloudinaryPhotos);

          recipeMutation.mutate({
            title: values.title,
            description: values.description,
            category: values.category,
            photos: cloudinaryPhotos,
            ingredients: values.ingredients,
            directions: values.directions,
          });
        }

        // stepRef.current = 1;
        // resetForm();
      }}
    >
      {(formik) => {
        return (
          <Form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              {/* ********** General Info Section ********** */}
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Create Recipe
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create and share your all your favorite recipes!
                  </p>
                </div>
                {/* ********** Title Section ********** */}
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="off"
                        className={`${
                          formik.errors.title && formik.touched.title
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-gray-100 p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      />
                    </div>
                    {formik.errors.title && formik.touched.title && (
                      <ErrMessage message={formik.errors.title} />
                    )}
                  </div>

                  {/* ********** Description Section ********** */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <Field
                        as="textarea"
                        id="description"
                        autoComplete="off"
                        name="description"
                        rows={3}
                        className={`${
                          formik.errors.description &&
                          formik.touched.description
                            ? "border-red-500"
                            : null
                        } block w-full rounded-md border-2 bg-gray-100 p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      />
                    </div>
                    {formik.errors.description &&
                      formik.touched.description && (
                        <ErrMessage message={formik.errors.description} />
                      )}
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about your recipe.
                    </p>
                  </div>

                  {/* ********** Category Section ********** */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="category"
                        id="category"
                        className={`${
                          formik.errors.category && formik.touched.category
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-gray-100 p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      />
                    </div>
                    {formik.errors.category && formik.touched.category && (
                      <ErrMessage message={formik.errors.category} />
                    )}
                  </div>

                  {/* ********** Photo Section ********** */}
                  <FieldArray name="photos">
                    {({ remove }) => (
                      <>
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="photos"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Photos preview
                          </label>

                          {/* ********** Photo Preview ********** */}
                          <div className="mt-1 flex gap-2">
                            {formik.values.photos.map((photo, index) => (
                              <div
                                key={photo.name}
                                className="flex flex-col items-center justify-center"
                              >
                                <span
                                  className={`h-12 w-12 overflow-hidden bg-gray-100`}
                                />
                                <span>{photo.name}</span>
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* ********** Add Photos Section ********** */}
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="cover-photo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Recipe photos
                          </label>
                          <div
                            className={`mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6`}
                          >
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="photos"
                                  className="relative cursor-pointer rounded-md bg-white font-medium text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 hover:text-cyan-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="photos"
                                    name="photos"
                                    type="file"
                                    className="sr-only"
                                    onChange={(e) => {
                                      if (e.currentTarget.files) {
                                        console.log(e.currentTarget.files[0]);
                                        formik.setFieldValue("photos", [
                                          ...formik.values.photos,
                                          ...Array.from(e.currentTarget.files),
                                        ]);
                                      }
                                    }}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                          {/* *********** photo errors ********** */}
                        </div>
                      </>
                    )}
                  </FieldArray>
                </div>
              </div>

              {/* ********** Details Section ********** */}
              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Recipe Details
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    How to make this delicious recipe.
                  </p>
                </div>

                {/* ********** Ingredient Section ********** */}
                <FieldArray name="ingredients">
                  {({ remove, push }) => (
                    <ul>
                      {formik.values.ingredients.map((ingr, index) => (
                        <li key={`${index}`}>
                          {/* ********** Ingredient Name ********** */}
                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Ingredient name
                              </label>
                              <div className="mt-1">
                                <Field
                                  name={`ingredients.${index}.name`}
                                  autoComplete="off"
                                  className={`
                                  ${
                                    (
                                      formik.errors.ingredients?.[
                                        index
                                      ] as FormikErrors<{
                                        name: string;
                                        amount: string;
                                        unit: string;
                                      }>
                                    )?.name &&
                                    formik.touched.ingredients?.[index]?.name
                                      ? "border-red-500"
                                      : null
                                  }
                                  block w-full rounded-md border-2 bg-gray-100 p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                                />
                              </div>
                              {(
                                formik.errors.ingredients?.[
                                  index
                                ] as FormikErrors<{
                                  name: string;
                                  amount: string;
                                  unit: string;
                                }>
                              )?.name &&
                                formik.touched.ingredients?.[index]?.name && (
                                  <ErrMessage
                                    message={
                                      (
                                        formik.errors.ingredients?.[
                                          index
                                        ] as FormikErrors<{
                                          name: string;
                                          amount: string;
                                          unit: string;
                                        }>
                                      )?.name
                                    }
                                  />
                                )}
                            </div>

                            {/* ********** Ingredient amount ********** */}
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Ingredient amount
                              </label>
                              <div className="mt-1">
                                <Field
                                  autoComplete="off"
                                  name={`ingredients.${index}.amount`}
                                  className={`${
                                    (
                                      formik.errors.ingredients?.[
                                        index
                                      ] as FormikErrors<{
                                        name: string;
                                        amount: string;
                                        unit: string;
                                      }>
                                    )?.amount &&
                                    formik.touched.ingredients?.[index]?.amount
                                      ? "border-red-500"
                                      : null
                                  } block w-full rounded-md border-2  bg-gray-100 p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                                />
                              </div>
                              {(
                                formik.errors.ingredients?.[
                                  index
                                ] as FormikErrors<{
                                  name: string;
                                  amount: string;
                                  unit: string;
                                }>
                              )?.amount &&
                                formik.touched.ingredients?.[index]?.amount && (
                                  <ErrMessage
                                    message={
                                      (
                                        formik.errors.ingredients?.[
                                          index
                                        ] as FormikErrors<{
                                          name: string;
                                          amount: string;
                                          unit: string;
                                        }>
                                      )?.amount
                                    }
                                  />
                                )}
                            </div>

                            {/* ********** Ingredient Unit ********** */}
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="unit"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Ingredient unit
                              </label>
                              <div className="mt-1">
                                <Field
                                  as="select"
                                  name={`ingredients.${index}.unit`}
                                  className={`block w-full rounded-md border-2 bg-gray-100 p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                                >
                                  <option value="United States">
                                    United States
                                  </option>
                                  <option value="Canada">Canada</option>
                                  <option value="Mexico">Mexico</option>
                                </Field>
                              </div>
                            </div>
                          </div>

                          {/* ********** Delete Ingredient Button *********** */}
                          <div className="col-span-6 mt-4">
                            <button
                              type="button"
                              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                      {/* ********** Add Ingredient Button *********** */}
                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            onClick={() =>
                              push({
                                name: "",
                                amount: "",
                                unit: "United States",
                              })
                            }
                          >
                            Add Ingredient
                          </button>
                        </div>
                      </div>
                    </ul>
                  )}
                </FieldArray>

                {/* ********** Direction Section ********** */}

                <FieldArray name="directions">
                  {({ remove, push }) => (
                    <ul>
                      {formik.values.directions.map((dir, index) => (
                        <div
                          key={`${dir.step}${index}`}
                          className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                        >
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <Field
                                as="textarea"
                                autoComplete="off"
                                name={`directions.${index}.text`}
                                rows={3}
                                className={`${
                                  (
                                    formik.errors.directions?.[
                                      index
                                    ] as FormikErrors<{
                                      step: number;
                                      text: string;
                                    }>
                                  )?.text &&
                                  formik.touched.directions?.[index]?.text
                                    ? "border-red-500"
                                    : null
                                } block w-full rounded-md border-2 bg-gray-100  p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                              />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                              Write a few sentences about your recipe.
                            </p>
                            {(
                              formik.errors.directions?.[
                                index
                              ] as FormikErrors<{
                                step: number;
                                text: string;
                              }>
                            )?.text &&
                              formik.touched.directions?.[index]?.text && (
                                <ErrMessage
                                  message={
                                    (
                                      formik.errors.directions?.[
                                        index
                                      ] as FormikErrors<{
                                        step: number;
                                        text: string;
                                      }>
                                    ).text
                                  }
                                />
                              )}
                          </div>

                          {/* ********** Delete Direction Button *********** */}
                          <div className="col-span-6">
                            <button
                              type="button"
                              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                              onClick={() => remove(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {/* ********** Add Direction Button *********** */}
                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            onClick={() => {
                              stepRef.current++;
                              push({
                                step: stepRef.current,
                                text: "",
                              });
                            }}
                          >
                            Add Direction
                          </button>
                        </div>
                      </div>
                    </ul>
                  )}
                </FieldArray>
              </div>
            </div>

            {/* ********** Submit Section ********** */}
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
