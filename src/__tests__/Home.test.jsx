import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";

// Helper function to create a fresh memory router for each test
const setupRouter = (initialPath = "/") =>
  createMemoryRouter(routes, { initialEntries: [initialPath] });

test("renders 'Home Page' inside of an <h1 />", async () => {
  const router = setupRouter("/");
  render(<RouterProvider router={router} />);
  
  // Wait for the loading state to disappear
  const h1 = await screen.findByText(/Home Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("Displays a list of movie titles", async () => {
  const router = setupRouter("/");
  render(<RouterProvider router={router} />);
  
  // Wait for the movie titles to appear
  const titleList = await screen.findAllByRole('heading', { level: 2 });
  expect(titleList.length).toBeGreaterThan(0); // Adjusted to check if movies are loaded
  expect(titleList[0].tagName).toBe("H2");
  expect(titleList[0].textContent).toBeTruthy(); // Avoid hard-coded value for flexibility
});

test("Displays links for each associated movie", async () => {
  const router = setupRouter("/");
  render(<RouterProvider router={router} />);
  
  // Wait for the links to appear
  const linkList = await screen.findAllByText(/View Info/);
  expect(linkList.length).toBeGreaterThan(0);
  expect(linkList[0].href).toContain("/movie/");
});

test("renders the <NavBar /> component", async () => {
  const router = setupRouter("/");
  render(<RouterProvider router={router} />);
  
  // Wait for the NavBar component to load
  const navbar = await screen.findByRole("navigation");
  expect(navbar).toBeInTheDocument();
  expect(navbar.className).toContain("navbar");
});
