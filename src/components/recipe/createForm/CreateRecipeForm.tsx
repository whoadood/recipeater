// Packages
import { Formik, Form, FieldArray, Field, FormikErrors } from "formik";
import { Fragment, useRef } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Image from "next/image";

// Components
import ErrMessage from "./ErrMessage";

// Utils
import { RecipeSchema } from "../../../types/schemas";
import { trpc } from "../../../utils/trpc";
import { uploadCloudinary } from "../../../utils/uploadCloudinary";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../../server/trpc/router/_app";
import { useDarkmode } from "../../../hooks/useDark";
import Button from "../../global/Button";
import { makeImageUrl } from "../../../utils/makeImageUrl";

// const tester = {
//   id: null,
//   title: "second recipe",
//   description: "this is my second recipe description",
//   difficulty: "hard",
//   category: "testing",
//   yield: 8,
//   prep_time: {
//     time: 10,
//     unit: "sec",
//   },
//   cook_time: {
//     time: 15,
//     unit: "hr",
//   },
//   photos: [
//     {
//       name: "modok.png",
//       public_id: "recipeater/modok_d9i2rz",
//       version: 1666192813,
//       signature: "51bdc9c46b2cfce5cb1e3bb7423131dd6d9cb72f",
//     },
//     {
//       name: "jobbot.png",
//       public_id: "recipeater/jobbot-bender_sh4i7v",
//       version: 1666192813,
//       signature: "6aede7ce0a31025205780f5d25d29fceaaa28edd",
//     },
//   ],
//   ingredients: [
//     { name: "asdf", amount: 2, unit: "cups" },
//     { name: "fdsa", amount: 5, unit: "cups" },
//   ],
//   directions: [
//     { step: 1, text: "asdfasdfasdf asdfasdfasdfasdf" },
//     { step: 2, text: "fdsa" },
//   ],
// };

export default function RecipeForm({
  editing = false,
  recipe,
}: {
  editing?: boolean;
  recipe?: inferProcedureOutput<AppRouter["recipe"]["createRecipe"]>;
}) {
  const stepRef = useRef(1);
  const utils = trpc.useContext();
  const { justFont, darkmode } = useDarkmode();
  const signatureMutation = trpc.recipe.getSignature.useMutation();
  const deleteSignatrueMutation = trpc.recipe.getDeleteSignature.useMutation({
    onSuccess(data) {
      console.log("delete on success data", data);
      utils.recipe.getRecipeById.invalidate();
    },
  });
  const createMutation = trpc.recipe.createRecipe.useMutation({
    onSuccess(data, variables, context) {
      utils.category.getTopCategory.invalidate();
      utils.profile.getProfileById.invalidate();
    },
  });
  const editMutation = trpc.recipe.editRecipe.useMutation({
    onSuccess() {
      utils.category.getTopCategory.invalidate();
      utils.profile.getProfileById.invalidate();
    },
  });

  const recipeInit: {
    title: string;
    description: string;
    category: string;
    // yield
    yield: number;
    // difficulty
    difficulty: string;
    // prep time
    prep_time: {
      id: string | null;
      time: number;
      unit: string;
    };
    // cook time
    cook_time: { id: string | null; time: number; unit: string };
    photos:
      | File[]
      | {
          id: string | null;
          name: string;
          public_id: string;
          version: string;
          signature: string;
        }[];
    ingredients: {
      id: string | null;
      name: string;
      amount: number;
      unit: string;
    }[];
    directions: { id: string | null; step: number; text: string }[];
  } =
    recipe &&
    recipe.prep_time &&
    recipe.cook_time &&
    recipe.directions &&
    recipe.ingredients
      ? {
          title: recipe.title,
          description: recipe.description,
          category: recipe.category.name,
          yield: recipe.yield,
          difficulty: recipe.difficulty,
          prep_time: recipe.prep_time,
          cook_time: recipe.cook_time,
          photos: [],
          ingredients: recipe.ingredients,
          directions: recipe.directions,
        }
      : {
          title: "",
          description: "",
          category: "",
          yield: 1,
          difficulty: "easy",
          prep_time: { id: null, time: 1, unit: "min" },
          cook_time: { id: null, time: 1, unit: "min" },
          photos: [],
          ingredients: [
            {
              id: null,
              name: "",
              amount: 1,
              unit: "tsp",
            },
          ],
          directions: [
            {
              id: null,
              step: 1,
              text: "",
            },
          ],
        };

  return (
    <Formik
      initialValues={recipeInit}
      validationSchema={toFormikValidationSchema(RecipeSchema)}
      onSubmit={async (values, { resetForm }) => {
        const { signature, timestamp } = await signatureMutation.mutateAsync();
        const cloudinaryPhotos = await uploadCloudinary(
          // account for already uploaded photos here
          // types are different
          // ditch type casting
          values.photos as File[],
          signature,
          timestamp
        );
        if (editing && recipe) {
          editMutation.mutate({
            id: recipe?.id,
            title: values.title,
            description: values.description,
            category: values.category,
            difficulty: values.difficulty,
            yield: values.yield,
            prep_time: values.prep_time,
            cook_time: values.cook_time,
            photos: [...recipe.images, ...cloudinaryPhotos],
            ingredients: values.ingredients,
            directions: values.directions,
          });
        } else {
          createMutation.mutate({
            id: null,
            title: values.title,
            description: values.description,
            category: { id: null, name: values.category },
            difficulty: values.difficulty,
            yield: values.yield,
            prep_time: values.prep_time,
            cook_time: values.cook_time,
            photos: cloudinaryPhotos,
            ingredients: values.ingredients,
            directions: values.directions,
          });
        }

        stepRef.current = 1;
        resetForm();
      }}
    >
      {(formik) => {
        return (
          <Form className="mx-auto max-w-4xl space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              {/* ********** General Info Section ********** */}
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6">
                    {editing ? "Edit Recipe" : "Create Recipe"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Create and share your all your favorite recipes!
                  </p>
                </div>
                {/* ********** Title Section ********** */}
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="username"
                      className={`block text-sm font-medium ${justFont()}`}
                    >
                      Title
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        type="text"
                        name="title"
                        autoComplete="off"
                        className={`${
                          formik.errors.title && formik.touched.title
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-inherit p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      />
                    </div>
                    {formik.errors.title && formik.touched.title && (
                      <ErrMessage message={formik.errors.title} />
                    )}
                  </div>

                  {/* ********** Description Section ********** */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="about"
                      className={`block text-sm font-medium ${justFont()}`}
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <Field
                        as="textarea"
                        autoComplete="off"
                        name="description"
                        rows={3}
                        className={`${
                          formik.errors.description &&
                          formik.touched.description
                            ? "border-red-500"
                            : null
                        } block w-full rounded-md border-2 bg-inherit p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
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
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="category"
                      className={`${justFont()} block text-sm font-medium `}
                    >
                      Category
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        type="text"
                        autoComplete="off"
                        name="category"
                        className={`${
                          formik.errors.category && formik.touched.category
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-inherit p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      />
                    </div>
                    {formik.errors.category && formik.touched.category && (
                      <ErrMessage message={formik.errors.category} />
                    )}
                  </div>

                  {/* ********** Difficulty ********** */}

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="difficulty"
                      className={`block text-sm font-medium ${justFont()}`}
                    >
                      Diffuclty
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        as={"select"}
                        name="difficulty"
                        autoComplete="off"
                        className={`${
                          formik.errors.difficulty && formik.touched.difficulty
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-inherit p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      >
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                        <option value="expert">expert</option>
                      </Field>
                    </div>
                    {formik.errors.difficulty && formik.touched.difficulty && (
                      <ErrMessage message={formik.errors.difficulty} />
                    )}
                  </div>

                  {/* ********** Yield ********** */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="username"
                      className={`block text-sm font-medium ${justFont()}`}
                    >
                      Yield
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        type="number"
                        min={1}
                        max={100}
                        name="yield"
                        autoComplete="off"
                        className={`${
                          formik.errors.yield && formik.touched.yield
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-inherit p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      />
                    </div>
                    {formik.errors.yield && formik.touched.yield && (
                      <ErrMessage message={formik.errors.yield} />
                    )}
                  </div>

                  {/* ********** Prep Time ********** */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="prep_time.time"
                      className={`block text-sm font-medium ${justFont()}`}
                    >
                      Prep Time
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        type="number"
                        min={1}
                        max={60}
                        autoComplete="off"
                        name="prep_time.time"
                        className={`${
                          formik.errors.prep_time?.time &&
                          formik.touched.prep_time?.time
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-inherit p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      />
                    </div>
                    {formik.errors.prep_time?.time &&
                      formik.touched.prep_time?.time && (
                        <ErrMessage message={formik.errors.prep_time?.time} />
                      )}
                  </div>
                  {/* ********** Prep Unit ********** */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="prep_time.unit"
                      className={`block text-sm font-medium ${justFont()}`}
                    >
                      Prep Unit
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        as={"select"}
                        name="prep_time.unit"
                        autoComplete="off"
                        className={`${
                          formik.errors.prep_time?.unit &&
                          formik.touched.prep_time?.unit
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-inherit p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      >
                        <option value="sec">seconds</option>
                        <option value="min">minutes</option>
                        <option value="hr">hours</option>
                      </Field>
                    </div>
                    {formik.errors.prep_time?.unit &&
                      formik.touched.prep_time?.unit && (
                        <ErrMessage message={formik.errors.prep_time.unit} />
                      )}
                  </div>

                  {/* ********** Cook Time ********** */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="cook_time.time"
                      className={`block text-sm font-medium ${justFont()}`}
                    >
                      Cook Time
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        type="number"
                        min={1}
                        max={60}
                        autoComplete="off"
                        name="cook_time.time"
                        className={`${
                          formik.errors.cook_time?.time &&
                          formik.touched.cook_time?.time
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-inherit p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      />
                    </div>
                    {formik.errors.cook_time?.time &&
                      formik.touched.cook_time?.time && (
                        <ErrMessage message={formik.errors.cook_time?.time} />
                      )}
                  </div>
                  {/* ********** Cook Unit ********** */}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="cook_time.unit"
                      className={`block text-sm font-medium ${justFont()}`}
                    >
                      Cook Unit
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        as={"select"}
                        name="cook_time.unit"
                        autoComplete="off"
                        className={`${
                          formik.errors.cook_time?.unit &&
                          formik.touched.cook_time?.unit
                            ? "border-red-500"
                            : null
                        } block w-full min-w-0 flex-1 rounded-md border-2 bg-inherit p-2 outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                      >
                        <option value="sec">seconds</option>
                        <option value="min">minutes</option>
                        <option value="hr">hours</option>
                      </Field>
                    </div>
                    {formik.errors.cook_time?.unit &&
                      formik.touched.cook_time?.unit && (
                        <ErrMessage message={formik.errors.cook_time.unit} />
                      )}
                  </div>

                  {/* ********** Photo Section ********** */}
                  <FieldArray name="photos">
                    {({ remove }) => (
                      <>
                        <div className="sm:col-span-6">
                          <p
                            className={`block text-sm font-medium ${justFont()}`}
                          >
                            Photos preview
                          </p>

                          {/* ********** Photo Preview ********** */}
                          <div className="mt-1 flex gap-2">
                            {/* ********** edit existing images ********** */}
                            {editing &&
                              recipe?.images.map((photo, index) => (
                                <div
                                  key={photo.name}
                                  className="flex flex-col items-center justify-center"
                                >
                                  <div className="flex h-12 items-center">
                                    <div className="relative h-12 w-12">
                                      <Image
                                        layout="fill"
                                        src={makeImageUrl(photo) as string}
                                        alt={photo.name}
                                      />
                                    </div>
                                  </div>
                                  <span>{photo.name}</span>
                                  <Button
                                    alt={true}
                                    text="delete"
                                    onClick={async () => {
                                      await deleteSignatrueMutation.mutateAsync(
                                        {
                                          photo_id: photo.id,
                                          public_id: photo.public_id,
                                        }
                                      );
                                    }}
                                  />
                                </div>
                              ))}
                            {formik.values.photos.map((photo, index) => (
                              <div
                                key={photo.name}
                                className="flex flex-col items-center justify-center"
                              >
                                <div className="relative h-12 w-12 overflow-hidden bg-gray-100">
                                  <Image
                                    layout="fill"
                                    alt={photo.name}
                                    src={URL.createObjectURL(photo as Blob)}
                                  />
                                </div>
                                <span>{photo.name}</span>
                                <Button
                                  alt={true}
                                  text="delete"
                                  onClick={() => remove(index)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* ********** Add Photos Section ********** */}
                        <div className="sm:col-span-6">
                          <label
                            className={`block text-sm font-medium ${justFont()}`}
                          >
                            Recipe photos
                          </label>
                          <label
                            className={`mt-1 flex cursor-pointer justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6`}
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
                              <div className={`flex text-sm ${justFont()}`}>
                                <label
                                  htmlFor="photos"
                                  className="relative cursor-pointer rounded-md font-medium text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 hover:text-cyan-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    name="photos"
                                    type="file"
                                    className="sr-only"
                                    onChange={(e) => {
                                      if (e.currentTarget.files) {
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
                          </label>
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
                  <h3 className={`text-lg font-medium leading-6 ${justFont()}`}>
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
                                className={`block text-sm font-medium ${justFont()}`}
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
                                  block w-full rounded-md border-2 bg-inherit p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
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
                                className={`block text-sm font-medium ${justFont()}`}
                              >
                                Ingredient amount
                              </label>
                              <div className="mt-1">
                                <Field
                                  autoComplete="off"
                                  type="number"
                                  min={1}
                                  max={60}
                                  name={`ingredients.${index}.amount`}
                                  className={`${
                                    (
                                      formik.errors.ingredients?.[
                                        index
                                      ] as FormikErrors<{
                                        name: string;
                                        amount: number;
                                        unit: string;
                                      }>
                                    )?.amount &&
                                    formik.touched.ingredients?.[index]?.amount
                                      ? "border-red-500"
                                      : null
                                  } block w-full rounded-md border-2  bg-inherit p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                                />
                              </div>
                              {(
                                formik.errors.ingredients?.[
                                  index
                                ] as FormikErrors<{
                                  name: string;
                                  amount: number;
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
                                          amount: number;
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
                                className={`block text-sm font-medium ${justFont()}`}
                              >
                                Ingredient unit
                              </label>
                              <div className="mt-1">
                                <Field
                                  as="select"
                                  name={`ingredients.${index}.unit`}
                                  className={`block w-full rounded-md border-2 bg-inherit p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                                >
                                  <option value="tsp">teaspoon</option>
                                  <option value="tbsp">tablespoon</option>
                                  <option value="lbs">pound</option>
                                  <option value="fl oz">fluid ounces</option>
                                  <option value="cups">cups</option>
                                  <option value="pints">pints</option>
                                  <option value="ltrs">liters</option>
                                </Field>
                              </div>
                            </div>
                          </div>

                          {/* ********** Delete Ingredient Button *********** */}
                          <div className="col-span-6 mt-4">
                            <Button
                              alt={true}
                              text="Delete"
                              onClick={() => remove(index)}
                            />
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
                                amount: 1,
                                unit: "tsp",
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
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="about"
                              className={`block text-sm font-medium ${justFont()}`}
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
                                } block w-full rounded-md border-2 bg-inherit  p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
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
                            <Button
                              alt={true}
                              text="Delete"
                              onClick={() => remove(index)}
                            />
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
                <Button
                  type={"submit"}
                  text="Submit"
                  disabled={formik.isSubmitting}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
