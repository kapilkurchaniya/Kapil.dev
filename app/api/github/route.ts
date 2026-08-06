import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_PAT;
  const username = "kapilkurchaniya"; 

  if (!token) {
    return NextResponse.json({ error: "No GitHub token found" }, { status: 500 });
  }

  const query = `
    query($userName:String!) {
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
      next: { revalidate: 3600 }, 
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
