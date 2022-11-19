// Packages
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { inferProcedureOutput } from "@trpc/server";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useDarkmode } from "../../hooks/useDark";
import { recipeRouter } from "../../server/trpc/router/recipe";
import { AppRouter } from "../../server/trpc/router/_app";
import { IRecipeData } from "../../types/globals";
import { trpc } from "../../utils/trpc";
import ErrMessage from "./createForm/ErrMessage";

// const comments = [
//   {
//     id: 1,
//     name: "Leslie Alexander",
//     date: "4d ago",
//     imageId: "1494790108377-be9c29b29330",
//     body: "Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.",
//   },
//   {
//     id: 2,
//     name: "Michael Foster",
//     date: "4d ago",
//     imageId: "1519244703995-f4e0f30006d5",
//     body: "Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.",
//   },
//   {
//     id: 3,
//     name: "Dries Vincent",
//     date: "4d ago",
//     imageId: "1506794778202-cad84cf45f1d",
//     body: "Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.",
//   },
// ];

// const user = {
//   name: "Whitney Francis",
//   email: "whitney@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
// };

export default function CommentList({
  recipe,
}: {
  recipe: inferProcedureOutput<AppRouter["recipe"]["getRecipeById"]>;
}) {
  const { darkmode } = useDarkmode();
  const { data: session } = useSession();
  const utils = trpc.useContext();
  const commentMutation = trpc.recipe.addComment.useMutation({
    onSuccess() {
      utils.recipe.getHomePage.invalidate();
      utils.recipe.getRecipeById.invalidate();
      utils.recipe.getRecipesBySearch.invalidate();
    },
  });

  return (
    <section aria-labelledby="notes-title">
      <div
        className={`${
          darkmode ? "bg-[#2e2e2e]" : "bg-inherit"
        } shadow sm:overflow-hidden sm:rounded-lg`}
      >
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6">
            <h2
              id="notes-title"
              className={`text-lg font-medium ${
                darkmode ? "text-white" : "text-gray-900"
              }`}
            >
              Comments
            </h2>
          </div>
          <div className="px-4 py-6 sm:px-6">
            <ul role="list" className="space-y-8">
              {recipe?.comments.map((comment) => (
                <li key={comment.id}>
                  <div className="flex space-x-3">
                    <div className="relative h-10 w-10 flex-shrink-0">
                      <Image
                        layout="fill"
                        className="rounded-full"
                        src={comment.user.image as string}
                        alt="user avatar"
                      />
                    </div>
                    <div>
                      <div className="text-sm">
                        <Link href={`/profile/${comment.user.id}`}>
                          <a
                            className={`font-medium hover:underline ${
                              darkmode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {comment.user.name}
                          </a>
                        </Link>
                      </div>
                      <div className="mt-1 text-sm text-gray-400">
                        <p>{comment.text}</p>
                      </div>
                      {/* <div className="mt-2 space-x-2 text-sm">
                        <span className="font-medium text-gray-500">
                          {}
                        </span>{" "}
                      </div> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {session && (
          <div
            className={`${
              darkmode ? "bg-[#3e3e3e]" : "bg-gray-50"
            } px-4 py-6 sm:px-6`}
          >
            <div className="flex space-x-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  layout="fill"
                  className="rounded-full"
                  src={session.user?.image as string}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <Formik
                  initialValues={{ text: "" }}
                  onSubmit={(values, { resetForm }) => {
                    commentMutation.mutate({
                      recipe_id: recipe?.id as string,
                      comment: values.text,
                    });
                    resetForm();
                  }}
                >
                  {(formik) => {
                    return (
                      <Form action="#">
                        <div>
                          <label htmlFor="comment" className="sr-only">
                            About
                          </label>
                          <div className="mt-1">
                            <Field
                              as="textarea"
                              autoComplete="off"
                              name="text"
                              rows={3}
                              className={` block w-full rounded-md border-2 bg-inherit p-2 shadow-sm outline-none focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm`}
                            />
                          </div>
                          {/* 
			  input styles for form error
			 ${
                                formik.errors.description &&
                                formik.touched.description
                                  ? "border-red-500"
                                  : null
                              }
			 
			      error message display
			  {formik.errors.description &&
                            formik.touched.description && (
                              <ErrMessage message={formik.errors.description} />
                            )} */}
                          <p className="mt-2 text-sm text-gray-500">
                            Leave a friendly comment about this recipe.
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-end">
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Comment
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
