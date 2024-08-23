# frozen_string_literal: true

require "rails_helper"

describe "All Links Query", type: :request do
  include_context "GraphQL Client"
  let!(:link1) { create(:link) }
  let!(:link2) { create(:link) }
  let!(:user) { create(:user) }
  let(:query) do
    <<-GRAPHQL
      query($first: Int!, $skip: Int!) {
        allLinks(
          first: $first,
          skip: $skip
        ){
          id
          url
          description,
          postedBy {
            id
            email
          }
        }
        meta {
          count
        }
      }
    GRAPHQL
  end

  it "returns the count" do
    response = client.execute(query, first: 2, skip: 0)

    meta_count = response.data.meta.count
    first_link = response.data.all_links[0]
    expect(meta_count).to eq Link.count
    expect(first_link.url).to eq link1.url
  end

  it "returns the one link when skip is 1" do
    response = client.execute(query, first: 2, skip: 1)
    all_link_count = response.data.all_links.count
    expect(all_link_count).to eq 1
  end

  it "returns the one link when skip is 1" do
    response = client.execute(query, first: 2, skip: 2)
    all_link_count = response.data.all_links.count
    expect(all_link_count).to eq 0
  end
end

describe "Filter Description Query", type: :request do
  include_context "GraphQL Client"
  let!(:link1) { create(:link) }
  let!(:link2) { create(:link) }
  let!(:user) { create(:user) }
  let(:query) do
    <<-GRAPHQL
      query($description: String!) {
        allLinks(
          filter:{
          description_contains: $description,
        }){
          description
        }
      }
    GRAPHQL
  end

  it "returns the filtered description" do
    response = client.execute(query, description: link1.description)
    first_link = response.data.all_links[0]
    expect(first_link.description).to eq link1.description
  end
end

describe "Filter Url Query", type: :request do
  include_context "GraphQL Client"
  let!(:link1) { create(:link) }
  let!(:link2) { create(:link) }
  let!(:user) { create(:user) }
  let(:query) do
    <<-GRAPHQL
      query($url: String!) {
        allLinks(
          filter:{
          url_contains: $url,
        }){
          url
          description
        }
      }
    GRAPHQL
  end

  it "returns the filtered url" do
    response = client.execute(query, url: link2.url)

    first_link = response.data.all_links[0]
    expect(first_link.url).to eq link2.url
  end
end

describe "Filter with two descriptions query", type: :request do
  include_context "GraphQL Client"
  let!(:link1) { create(:link) }
  let!(:link2) { create(:link) }
  let!(:user) { create(:user) }
  let(:query) do
    <<-GRAPHQL
      query($description1: String!, $description2: String!) {
        allLinks(
          filter:{
            OR:[
              { description_contains: $description1 },
              { description_contains: $description2 }
            ]
          }){
          description
        }
      }
    GRAPHQL
  end

  it "returns the filtered description" do
    response = client.execute(query, description1: link1.description, description2: link2.description)

    first_link = response.data.all_links[0]
    second_link = response.data.all_links[1]
    expect(first_link.description).to eq link1.description
    expect(second_link.description).to eq link2.description
  end
end
