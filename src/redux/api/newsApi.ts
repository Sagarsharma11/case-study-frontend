import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

// Define the NewsArticle interface
export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  author?: string;
  publishedAt: string;
  source: string;
  image: string;
}

// Ensure the environment variable is defined
const API_KEY = import.meta.env.VITE_APP_API_KEY;
if (!API_KEY) {
  throw new Error('API key is not defined. Please set VITE_APP_API_KEY in your .env file.');
}

// Define a base query function using Axios
const axiosBaseQuery: BaseQueryFn<any, unknown, unknown> = async ({ url, method, body }, { }) => {
  try {
    const response = await axios({
      url,
      method,
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { data: response.data };
  } catch (err: any) {
    return { error: { message: err.message } };
  }
};

// Create the API slice
export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    // Fetch articles
    getArticles: builder.query<NewsArticle[], { keyword: string; page: number; type: string }>({
      query: ({ keyword, page, type }) => {
        let body: any = {
          action: 'getArticles',
          sourceLocationUri: [
            'http://en.wikipedia.org/wiki/United_States',
            'http://en.wikipedia.org/wiki/Canada',
            'http://en.wikipedia.org/wiki/United_Kingdom',
            'http://en.wikipedia.org/wiki/india',
          ],
          ignoreSourceGroupUri: 'paywall/paywalled_sources',
          articlesPage: page,
          articlesCount: 100,
          articlesSortBy: 'date',
          articlesSortByAsc: false,
          dataType: ['news', 'pr'],
          forceMaxDataTimeWindow: 31,
          resultType: 'articles',
          apiKey: API_KEY, // Use the environment variable
        };

        if (type === 'source') {
          body.sourceUri = keyword;
        } else if (type === '' || type === 'keyword') {
          body.keyword = keyword;
        } else if (type === 'date') {
          body.dateStart = keyword;
        } else if (type === 'category' && keyword !== '') {
          body.categoryUri = keyword;
        }

        console.log('body ', body);

        return {
          url: 'https://eventregistry.org/api/v1/article/getArticles',
          method: 'POST',
          body,
        };
      },
      transformResponse: (response: any) => {
        console.log('-> ', response);
        return response.articles.results.map((article: any) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          author: article.author || 'Unknown',
          publishedAt: article.publishedAt,
          source: article.source.uri,
          image: article.image,
        }));
      },
    }),

    // Fetch categories
    getCategories: builder.query<{ uri: string; label: string; parentUri: string }[], { keyword: string }>({
      query: ({ keyword }) => {
        let body = {
          prefix: keyword,
          page: 1,
          count: 20,
          articleBodyLen: -1,
          apiKey: API_KEY, // Use the environment variable
        };

        return {
          url: 'https://eventregistry.org/api/v1/suggestCategoriesFast',
          method: 'POST',
          body,
        };
      },
      transformResponse: (response: any) => {
        console.log('=> ', response);
        return response.map((category: any) => ({
          uri: category.uri,
        }));
      },
    }),
  }),
});

// Export hooks and reducer
export const { useGetArticlesQuery, useGetCategoriesQuery } = newsApi;
export default newsApi.reducer;
