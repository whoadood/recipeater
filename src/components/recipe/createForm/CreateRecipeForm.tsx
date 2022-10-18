// Packages
import {
  Formik,
  Form,
  FieldArray,
  ErrorMessage,
  Field,
  validateYupSchema,
} from "formik";
import { Fragment, useRef } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

// Utils
import { RecipeSchema } from "../../../types/schemas";

const recipeInit = {
  title: "",
  description: "",
  category: "",
  photos: [],
  ingredients: [
    {
      name: "",
      amount: "",
      unit: "",
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

  return (
    <Formik
      initialValues={recipeInit}
      // validationSchema={toFormikValidationSchema(RecipeSchema)}
      onSubmit={async (values, { resetForm }) => {
        console.log("form submit", values);
        stepRef.current = 1;
        resetForm();
      }}
    >
      {(formik) => (
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
                      className="block w-full min-w-0 flex-1 rounded-md border-gray-300 px-2 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* ********** Description Section ********** */}
                <div className="sm:col-span-6">
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
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
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
                      name="category"
                      id="category"
                      className="block w-full min-w-0 flex-1 rounded-md border-gray-300 px-2 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    />
                  </div>
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
                              <span className="h-12 w-12 overflow-hidden bg-gray-100" />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ********** Add Photos Section ********** */}
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="cover-photo"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Recipe photos
                        </label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                                className="relative cursor-pointer rounded-md bg-white font-medium text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
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
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="amount"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Ingredient amount
                            </label>
                            <div className="mt-1">
                              <Field
                                name={`ingredients.${index}.amount`}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                              />
                            </div>
                          </div>

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
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
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
                          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                          onClick={() =>
                            push({
                              name: "",
                              amount: "",
                              unit: "United States",
                            })
                          }
                        >
                          Add Direction
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
                              name={`directions.${index}.text`}
                              rows={3}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Write a few sentences about your recipe.
                          </p>
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
                          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
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
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
