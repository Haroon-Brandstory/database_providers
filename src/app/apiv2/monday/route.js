export async function POST(req) {
    try {
        const body = await req.json();

        const {
            first_name,
            email,
            phone,
            company,
            years,
            services,
            specialties,
        } = body;

        const apiToken = process.env.MONDAY_API_TOKEN;

        const clean = (value) =>
            String(value ?? "")
                .replace(/\r\n/g, "\n")
                .replace(/\s+/g, " ")
                .trim();

        const columnValues = {
            lead_email: {
                email: clean(email),
                text: clean(email),
            },
            lead_phone: {
                phone: clean(phone),
            },
            color_mkspqgwf: "Website",
            lead_company: clean(first_name),
            numeric_mm0ppxzp: clean(years) || "0",
            dropdown_mm0pezmt: clean(services),
            long_text_mm10d24v: clean(specialties),
        };

        const boardId = "5026903123";
        const groupId = "topics";

        // Use variables so newlines/quotes in message never break GraphQL.
        const query = `
            mutation CreateItem(
                $boardId: ID!
                $groupId: String!
                $itemName: String!
                $columnValues: JSON!
            ) {
                create_item(
                    board_id: $boardId
                    group_id: $groupId
                    item_name: $itemName
                    column_values: $columnValues
                ) {
                    id
                }
            }
        `;

        const response = await fetch("https://api.monday.com/v2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: apiToken,
            },
            body: JSON.stringify({
                query,
                variables: {
                    boardId,
                    groupId,
                    itemName: clean(company) || "Contact Enquiry",
                    columnValues: JSON.stringify(columnValues),
                },
            }),
        });

        const result = await response.json();

        if (result.errors) {
            return Response.json({ error: result.errors }, { status: 500 });
        }

        return Response.json({
            success: true,
            itemId: result.data.create_item.id,
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
