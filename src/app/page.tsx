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

    const page = typeof params?.page === "string"
        ? params.page
        : Array.isArray(params?.page)
            ? params.page[0]
            : params.page;
    const tag = typeof params?.tag === "string"
        ? params.tag
        : Array.isArray(params?.tag)
            ? params.tag[0]
            : params.tag;
  const sort = (rawSort === "asc" || rawSort === "desc") ? rawSort : "desc";


  return (
      <div>
        <Heading title="View the feelings"/>
        <Search/>
        <SortBtn sortData={sortData} defaultValue={"desc"}/>
        <Suspense fallback={<PostSkeleton/>}>
          <PostList search={search} sort={sort} page={page || 1} tag={tag}/>
        </Suspense>
      </div>
  );
}