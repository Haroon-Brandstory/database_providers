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
            specialties
        } = body;

        const apiToken = process.env.MONDAY_API_TOKEN;

        const columnValues = {
            lead_email: {
                email: email,
                text: email
            },
            lead_phone: {
                phone: phone
            },
            color_mkspqgwf: "Website",
            lead_company: first_name,
            numeric_mm0ppxzp: years,
            dropdown_mm0pezmt: services,
            long_text_mm10d24v: specialties
        };

        const boardId = 5026903123;
        const groupId = "topics";

        const query = `
            mutation {
                create_item(
                    board_id: ${boardId},
                    group_id: "${groupId}",
                    item_name: "${company}",
                    column_values: "${JSON.stringify(columnValues).replace(/"/g, '\\"')}"
                ) {
                    id
                }
            }
        `;

        const response = await fetch("https://api.monday.com/v2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: apiToken
            },
            body: JSON.stringify({ query })
        });

        const result = await response.json();

        if (result.errors) {
            return Response.json(
                { error: result.errors },
                { status: 500 }
            );
        }

        return Response.json({
            success: true,
            itemId: result.data.create_item.id
        });

    } catch (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}