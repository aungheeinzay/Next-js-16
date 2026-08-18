import Heading from "@/components/Heading";
import {Suspense} from "react";
import PostSkeleton from "@/fetaures/posts/components/PostSkeleton";
import PostList from "@/fetaures/posts/components/postList";
import Search from "@/components/Search";
import {SearchParams} from "next/dist/server/request/search-params";
import SortBtn from "@/components/SortBtn";
import {sortData} from "@/sortData";

interface Props{
  searchParams: Promise<SearchParams>
}

export default async function Home({searchParams}: Props) {
  const params = await searchParams;


  const search = typeof params?.search === "string"
      ? params.search
      : Array.isArray(params?.search)
          ? params.search[0]
          : "";


  const rawSort = typeof params?.sort === "string"
      ? params.sort
      : Array.isArray(params?.sort)
          ? params.sort[0]
          : "desc";

  const sort = (rawSort === "asc" || rawSort === "desc") ? rawSort : "desc";

  console.log("searchParams", search, sort);

  return (
      <div>
        <Heading title="View the feelings"/>
        <Search/>
        <SortBtn sortData={sortData} defaultValue={"desc"}/>
        <Suspense fallback={<PostSkeleton/>}>
          <PostList search={search} sort={sort}/>
        </Suspense>
      </div>
  );
}