import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function get(req, res) {
  try {
    const companyInfo = await prisma.companyInfo.findMany();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(companyInfo));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Error fetching company info" }));
  } finally {
    await prisma.$disconnect();
  }
}
